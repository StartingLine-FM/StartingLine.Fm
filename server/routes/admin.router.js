const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
//rejectUnauthenticated gives the admin page some sercurity 
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const algoliasearch = require('algoliasearch');
require('dotenv').config();

//middleware that checks if the user has admin privileges 
const isAdmin = (req, res, next) => {
    // If the user is authenticated and has admin privileges, continue with request
    if (req.user && req.user.admin) {
        next();
    } else {
        // If user doesn't have admin privileges, send an error response
        res.status(403).json({ message: 'You do not have admin access.' });
    }
};

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
const index = client.initIndex('test_resource_3');
const algoliaQuery = `
    SELECT
        r."id" AS "objectID",
        r."name",
        r."description",
        r."image_url",
        o."name" AS "organization_name",
        o."id" AS "organization_id",
        s."name" AS "stage_name",
        s."id" AS "stage_id",
        e."title" AS "entrepreneur_title",
        (
            SELECT ARRAY_AGG("support"."title")
            FROM "support_join" sj
            JOIN "support" ON sj."support_id" = "support"."id"
            WHERE sj."resource_id" = r."id"
        ) AS "support_titles",
        STRING_AGG("funding"."title", ', ') AS "funding_titles",
        r."website",
        r."email",
        r."address",
        r."linkedin"
    FROM "resource" r
    LEFT JOIN "organization" o ON o."id" = r."organization_id"
    LEFT JOIN "stage" s ON s."id" = r."stage_id"
    LEFT JOIN "entrepreneur" e ON e."id" = r."entrepreneur_id"
    LEFT JOIN "funding_join" fj ON r."id" = fj."resource_id"
    LEFT JOIN "funding" funding ON fj."funding_id" = funding."id"
    GROUP BY
        r."id",
        o."name",
        o."id",
        s."name",
        s."id",
        e."title";
`;

const fetchSupportTitles = async (resourceId) => {
    const supportQuery = `
        SELECT "support"."title"
        FROM "support_join" sj
        JOIN "support" ON sj."support_id" = "support"."id"
        WHERE sj."resource_id" = $1;
    `;
    try {
        const result = await pool.query(supportQuery, [resourceId]);
        return result.rows.map(row => row.title);
    } catch (error) {
        console.log("Error fetching support titles:", error);
        throw error;
    }
};

const algoliaSave = async () => {
    try {
        // Fetch data from PostgreSQL
        const result = await pool.query(algoliaQuery);
        // console.log("Fetched data from PostgreSQL:", result.rows);

        // Transform data for Algolia
        const resources = await Promise.all(result.rows.map(async (row) => {
            const supportTitles = await fetchSupportTitles(row.objectID);

            return {
                objectID: row.objectID,
                name: row.name,
                description: row.description,
                image_url: row.image_url,
                organization_id: row.organization_id,
                organization_name: row.organization_name,
                stage_name: row.stage_name,
                stage_id: row.stage_id,
                entrepreneur_id: row.entrepreneur_id, // Add entrepreneur_id
                entrepreneur_title: row.entrepreneur_title,
                support_titles: supportTitles,
                funding_titles: Array.isArray(row.funding_titles) ? row.funding_titles : [],
                website: row.website,
                email: row.email,
                address: row.address,
                linkedin: row.linkedin,
            };
        }));

        // Save the resources into the Algolia index
        await index.saveObjects(resources);
        console.log("Algolia index updated successfully");
    } catch (error) {
        console.log("Error on Algolia saveObjects:", error);
    }
};









// ***** RESOURCE *****

// Route to add a new resource for the admin
// This endpoint is a POST request that inserts a new resource into the 'resource' table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.post('/', rejectUnauthenticated, isAdmin, async (req, res) => {

    // The request body should contain the new resource's details
    const newResource = req.body;

    // initial resource table insert query
    const resourceQuery = `INSERT INTO "resource"(stage_id, organization_id, entrepreneur_id, name, image_url, description, website, email, address, linkedin) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
        RETURNING "id";`
    // support and function queries each calling blingCounter for SQL sanitization
    const supportQuery = `INSERT INTO "support_join" ("support_id", "resource_id")
    VALUES($1, $2);`
    const fundingQuery = `INSERT INTO "funding_join" ("funding_id", "resource_id")
    VALUES($1, $2);`

    try {
        // first, we instantiate the resource INSERT into a variable
        // so we can store the RETURNING "id" value to reference for the join table INSERTs
        let addedResource = await pool.query(
            resourceQuery,
            [
                newResource.stage_id,
                newResource.organization_id,
                newResource.entrepreneur_id,
                newResource.name,
                newResource.image_url,
                newResource.description,
                newResource.website,
                newResource.email,
                newResource.address,
                newResource.linkedin
            ]);
        let resourceId = addedResource.rows[0].id;
        if (newResource.support.length > 0) {
            for (tag of newResource.support) {
                await pool.query(supportQuery, [tag, resourceId])
            }
        }
        if (newResource.funding.length > 0) {
            for (tag of newResource.funding) {
                await pool.query(fundingQuery, [tag, resourceId])
            }
        }
        // Upon successfull post, update the algolia index to reflect the newly added resource
        await algoliaSave(resourceId);
        // Send a 201 status code to the client to indicate that the resource was successfully created
        res.sendStatus(201);
    } catch (err) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error adding resource', err);
        res.sendStatus(500);
    }
});

// Route to update a resource for the admin
// This endpoint is a PUT request that updates an existing resource in the 'resource' table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.put('/:id', rejectUnauthenticated, isAdmin, async (req, res) => {
    const updatedResource = req.body;
    const resourceId = req.params.id;

    const resourceQuery = `
        UPDATE "resource" 
        SET 
        stage_id = $1, 
        organization_id=$2, 
        entrepreneur_id=$3, 
        name=$4, 
        image_url=$5, 
        description=$6, 
        website=$7, 
        email=$8, 
        address=$9, 
        linkedin=$10
        WHERE id=$11
    `;

    try {
        await pool.query(resourceQuery, [
            updatedResource.stage_id,
            updatedResource.organization_id,
            updatedResource.entrepreneur_id,
            updatedResource.name,
            updatedResource.image_url,
            updatedResource.description,
            updatedResource.website,
            updatedResource.email,
            updatedResource.address,
            updatedResource.linkedin,
            resourceId
        ]);

        // Update support join table
        if (updatedResource.support) {
            for (const support of updatedResource.support) {
                const supportQuery = `UPDATE "support_join" SET "support_id"=$1 WHERE "id"=$2;`;
                await pool.query(supportQuery, [support.support_id, support.id]);
            }
        }

        // Update funding join table
        if (updatedResource.funding) {
            for (const funding of updatedResource.funding) {
                const fundingQuery = `UPDATE "funding_join" SET "funding_id"=$1 WHERE "id"=$2;`;
                await pool.query(fundingQuery, [funding.funding_id, funding.id]);
            }
        }

        // Update the Algolia index
        await algoliaSave(resourceId);
        res.sendStatus(200);
    } catch (err) {
        console.log('Error updating resource', err);
        res.sendStatus(500);
    }
});


// Route to delete a resource for the admin
// This endpoint is a DELETE request that removes an existing resource from the 'resource' table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.delete('/:id', rejectUnauthenticated, isAdmin, async (req, res) => {
    // The SQL query to delete a resource
    const queryText = 'DELETE FROM resource WHERE id =$1';
    try {
        // Execute the SQL query
        await pool.query(queryText, [req.params.id]);
        // Upon successful delete, delete object from algolia index
        index.deleteObject(req.params.id)
        // Send a 200 status code to the client to indicate that the request was successful
        res.sendStatus(200);
    } catch (err) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error deleting resource', err);
        res.sendStatus(500);
    }
});

// ***** ORGANIZATION *****

// Route to fetch all organizations
// This endpoint is a GET request that retrieves all organizations from the organization table in the database. 
// After executing the SQL query, it sends back the resulting rows to the client as a response.
router.get('/organizations', async (req, res) => {
    try {
        // The SQL query to retrieve all organizations
        const queryText = 'SELECT * FROM organization';
        // Execute the SQL query
        const result = await pool.query(queryText);
        // Send the result to the client
        res.send(result.rows);
    } catch (error) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error fetching organizations', error);
        res.sendStatus(500);
    }
});

//Route to add a new organization for the admin
// This endpoint is a POST request that adds a new organization to the organization table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.post('/organizations', rejectUnauthenticated, isAdmin, async (req, res) => {
    // The request body should contain the new organization details
    const newOrganization = req.body;
    // The SQL query to insert a new organization
    const queryText = 'INSERT INTO organization (name, description) VALUES ($1, $2)';
    try {
        // Execute the SQL query
        await pool.query(queryText, [newOrganization.name, newOrganization.description]);
        // Send a 201 status code to the client to indicate that the resource was successfully created
        res.sendStatus(201);
    } catch (err) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error adding organization', err);
        res.sendStatus(500);
    }
});

// Route to update a organization for the admin
// This endpoint is a PUT request that updates the details of an existing organization in the organization table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.put('/organizations/:id', rejectUnauthenticated, isAdmin, async (req, res) => {
    // The request body should contain the updated organization details
    const updatedOrganization = req.body;
    // The SQL query to update a organization
    const queryText = 'UPDATE organization SET name = $1, description = $2 WHERE id = $3';
    try {
        // Execute the SQL query
        await pool.query(queryText, [updatedOrganization.name, updatedOrganization.description, req.params.id]);
        algoliaSave();
        // Send a 200 status code to the client to indicate that the request was successful
        res.sendStatus(200);
    } catch (err) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error updating organization', err);
        res.sendStatus(500);
    }
});

// Route to delete a organization for the admin
// This endpoint is a DELETE request that removes an existing organization from the organization table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.delete('/organizations/:id', rejectUnauthenticated, isAdmin, async (req, res) => {
    // The SQL query to delete a organization
    const queryText = 'DELETE FROM organization WHERE id = $1';
    try {
        // Execute the SQL query
        await pool.query(queryText, [req.params.id]);
        // Send a 200 status code to the client to indicate that the request was successful
        res.sendStatus(200);
    } catch (err) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error deleting organization', err);
        res.sendStatus(500);
    }

});

// ***** STAGE *****

// Route to fetch all stages
// This endpoint is a GET request that retrieves all stages from the stage table in the database. 
// After executing the SQL query, it sends back the resulting rows to the client as a response.
router.get('/stages', async (req, res) => {
    try {
        // The SQL query to retrieve all stages
        const queryText = 'SELECT * FROM stage';
        // Execute the SQL query
        const result = await pool.query(queryText);
        // Send the result to the client
        res.send(result.rows);
    } catch (error) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error fetching stages', error);
        res.sendStatus(500);
    }
});

//Route to add a new stage for the admin
// This endpoint is a POST request that adds a new stage to the stage table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.post('/stages', rejectUnauthenticated, isAdmin, async (req, res) => {
    // The request body should contain the new stage details
    const newStage = req.body;
    // The SQL query to insert a new stage
    const queryText = "INSERT INTO stage (name, description) VALUES ($1, $2)";
    try {
        // Execute the SQL query
        await pool.query(queryText, [newStage.name]);
        // Send a 201 status code to the client to indicate that the resource was successfully created
        res.sendStatus(201);
    } catch (err) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error adding stage', err);
        res.sendStatus(500);
    }
});

// Route to update a stage for the admin
// This endpoint is a PUT request that updates the details of an existing stage in the stage table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.put('/stages/:id', rejectUnauthenticated, isAdmin, async (req, res) => {
    // The request body should contain the updated stage details
    const updatedStage = req.body;
    // The SQL query to update a stage
    const queryText = 'UPDATE stage SET name = $1, description = $2 WHERE id = $3';
    try {
        // Execute the SQL query
        await pool.query(queryText, [updatedStage.name, updatedStage.description, req.params.id]);
        algoliaSave();
        // Send a 200 status code to the client to indicate that the request was successful
        res.sendStatus(200);
    } catch (err) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error updating stage', err);
        res.sendStatus(500);
    }
});

// Route to delete a stage for the admin
// This endpoint is a DELETE request that removes an existing stage from the stage table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.delete('/stages/:id', rejectUnauthenticated, isAdmin, async (req, res) => {
    // The SQL query to delete a stage
    const queryText = 'DELETE FROM stage WHERE id = $1';
    try {
        // Execute the SQL query
        await pool.query(queryText, [req.params.id]);
        // Send a 200 status code to the client to indicate that the request was successful
        res.sendStatus(200);
    } catch (err) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error deleting stage', err);
        res.sendStatus(500);
    }
});

// ***** SUPPORT *****

// Route to fetch all support tags
// This endpoint is a GET request that retrieves all support tags from the stage table in the database. 
// After executing the SQL query, it sends back the resulting rows to the client as a response.
router.get('/support', async (req, res) => {
    try {
        // The SQL query to retrieve all support
        const queryText = 'SELECT * FROM support';
        // Execute the SQL query
        const result = await pool.query(queryText);
        // Send the result to the client
        res.send(result.rows);
    } catch (error) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error fetching support', error);
        res.sendStatus(500);
    }
});

//Route to add a new support for the admin
// This endpoint is a POST request that adds a new support to the support table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.post('/support', rejectUnauthenticated, isAdmin, async (req, res) => {
    // The request body should contain the new support details
    const newSupport = req.body;
    // The SQL query to insert a new Support
    const queryText = "INSERT INTO support (name, description) VALUES ($1, $2)";
    try {
        // Execute the SQL query
        await pool.query(queryText, [newSupport.name]);
        // Send a 201 status code to the client to indicate that the resource was successfully created
        res.sendStatus(201);
    } catch (err) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error adding support', err);
        res.sendStatus(500);
    }
});

// Route to update a support for the admin
// This endpoint is a PUT request that updates the details of an existing support in the support table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.put('/support/:id', rejectUnauthenticated, isAdmin, async (req, res) => {
    // The request body should contain the updated support details
    const updatedSupport = req.body;
    // The SQL query to update a support
    const queryText = 'UPDATE support SET name = $1, description = $2 WHERE id = $3';
    try {
        // Execute the SQL query
        await pool.query(queryText, [updatedSupport.name, updatedSupport.description, req.params.id]);
        algoliaSave();
        // Send a 200 status code to the client to indicate that the request was successful
        res.sendStatus(200);
    } catch (err) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error updating support', err);
        res.sendStatus(500);
    }
});

// Route to delete a support tag for the admin
// This endpoint is a DELETE request that removes an existing support from the support table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.delete('/support/:id', rejectUnauthenticated, isAdmin, async (req, res) => {
    // The SQL query to delete a support
    const queryText = 'DELETE FROM support WHERE id = $1';
    try {
        // Execute the SQL query
        await pool.query(queryText, [req.params.id]);
        // Send a 200 status code to the client to indicate that the request was successful
        res.sendStatus(200);
    } catch (err) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error deleting support', err);
        res.sendStatus(500);
    }
});

// ***** FUNDING *****

// Route to fetch all funding tags
// This endpoint is a GET request that retrieves all funding tags from the stage table in the database. 
// After executing the SQL query, it sends back the resulting rows to the client as a response.
router.get('/funding', async (req, res) => {
    try {
        // The SQL query to retrieve all funding
        const queryText = 'SELECT * FROM funding';
        // Execute the SQL query
        const result = await pool.query(queryText);
        // Send the result to the client
        res.send(result.rows);
    } catch (error) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error fetching funding', error);
        res.sendStatus(500);
    }
});

//Route to add a new funding tag for the admin
// This endpoint is a POST request that adds a new funding tag to the funding table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.post('/funding', rejectUnauthenticated, isAdmin, async (req, res) => {
    // The request body should contain the new funding details
    const newFunding = req.body;
    // The SQL query to insert a new funding
    const queryText = "INSERT INTO funding (name, description) VALUES ($1, $2)";
    try {
        // Execute the SQL query
        await pool.query(queryText, [newFunding.name]);
        // Send a 201 status code to the client to indicate that the resource was successfully created
        res.sendStatus(201);
    } catch (err) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error adding funding', err);
        res.sendStatus(500);
    }
});

// Route to update a funding for the admin
// This endpoint is a PUT request that updates the details of an existing funding tag in the funding table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.put('/funding/:id', rejectUnauthenticated, isAdmin, async (req, res) => {
    // The request body should contain the updated funding details
    const updatedFunding = req.body;
    // The SQL query to update a funding
    const queryText = 'UPDATE funding SET name = $1, description = $2 WHERE id = $3';
    try {
        // Execute the SQL query
        await pool.query(queryText, [updatedFunding.name, updatedFunding.description, req.params.id]);
        algoliaSave();
        // Send a 200 status code to the client to indicate that the request was successful
        res.sendStatus(200);
    } catch (err) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error updating funding', err);
        res.sendStatus(500);
    }
});

// Route to delete a funding tag for the admin
// This endpoint is a DELETE request that removes an existing funding tag from the funding table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.delete('/funding/:id', rejectUnauthenticated, isAdmin, async (req, res) => {
    // The SQL query to delete a funding
    const queryText = 'DELETE FROM funding WHERE id = $1';
    try {
        // Execute the SQL query
        await pool.query(queryText, [req.params.id]);
        // Send a 200 status code to the client to indicate that the request was successful
        res.sendStatus(200);
    } catch (err) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error deleting funding', err);
        res.sendStatus(500);
    }
});

// ***** ENTREPRENEUR *****

// Route to fetch all entrepreneur tags
// This endpoint is a GET request that retrieves all entrepreneur tags from the stage table in the database. 
// After executing the SQL query, it sends back the resulting rows to the client as a response.
router.get('/entrepreneur', async (req, res) => {
    try {
        // The SQL query to retrieve all entrepreneur
        const queryText = 'SELECT * FROM entrepreneur';
        // Execute the SQL query
        const result = await pool.query(queryText);
        // Send the result to the client
        res.send(result.rows);
    } catch (error) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error fetching entrepreneur', error);
        res.sendStatus(500);
    }
});

//Route to add a new entrepreneur tag for the admin
// This endpoint is a POST request that adds a new entrepreneur tag to the entrepreneur table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.post('/entrepreneur', rejectUnauthenticated, isAdmin, async (req, res) => {
    // The request body should contain the new entrepreneur details
    const newEntrepreneur = req.body;
    // The SQL query to insert a new entrepreneur
    const queryText = "INSERT INTO entrepreneur (name, description) VALUES ($1, $2)";
    try {
        // Execute the SQL query
        await pool.query(queryText, [newEntrepreneur.name]);
        // Send a 201 status code to the client to indicate that the resource was successfully created
        res.sendStatus(201);
    } catch (err) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error adding entrepreneur', err);
        res.sendStatus(500);
    }
});

// Route to update an entrepreneur tag for the admin
// This endpoint is a PUT request that updates the details of an existing entrepreneur tag in the entrepreneur table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.put('/entrepreneur/:id', rejectUnauthenticated, isAdmin, async (req, res) => {
    // The request body should contain the updated entrepreneur details
    const updatedEntrepreneur = req.body;
    // The SQL query to update a entrepreneur
    const queryText = 'UPDATE entrepreneur SET name = $1, description = $2 WHERE id = $3';
    try {
        // Execute the SQL query
        await pool.query(queryText, [updatedEntrepreneur.name, updatedEntrepreneur.description, req.params.id]);
        algoliaSave();
        // Send a 200 status code to the client to indicate that the request was successful
        res.sendStatus(200);
    } catch (err) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error updating entrepreneur', err);
        res.sendStatus(500);
    }
});

// Route to delete an entrepreneur tag for the admin
// This endpoint is a DELETE request that removes an existing entrepreneur tag from the entrepreneur table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.delete('/entrepreneur/:id', rejectUnauthenticated, isAdmin, async (req, res) => {
    // The SQL query to delete a entrepreneur
    const queryText = 'DELETE FROM entrepreneur WHERE id = $1';
    try {
        // Execute the SQL query
        await pool.query(queryText, [req.params.id]);
        // Send a 200 status code to the client to indicate that the request was successful
        res.sendStatus(200);
    } catch (err) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error deleting entrepreneur', err);
        res.sendStatus(500);
    }
});

module.exports = router;