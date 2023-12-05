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
const index = client.initIndex('resource');
// const index = client.initIndex('resource_windows');
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
    e."id" AS "entrepreneur_id",
    CASE
        WHEN COUNT(sj."support_id") = 0 THEN NULL
        ELSE jsonb_agg(
            DISTINCT jsonb_build_object(
                'support_id', sj."support_id",
                'support_join_id', sj."id",
                'title', su."title"
            )
        )
    END AS "support",
    CASE
        WHEN COUNT(fj."funding_id") = 0 THEN NULL
        ELSE jsonb_agg(
            DISTINCT jsonb_build_object(
                'funding_id', fj."funding_id",
                'funding_join_id', fj."id",
                'title', f."title"
            )
        )
    END AS "funding",
    r."website",
    r."email",
    r."address",
    r."linkedin"
FROM "resource" r
LEFT JOIN "organization" o ON o."id" = r."organization_id"
LEFT JOIN "stage" s ON s."id" = r."stage_id"
LEFT JOIN "entrepreneur" e ON e."id" = r."entrepreneur_id"
LEFT JOIN "support_join" sj ON sj."resource_id" = r."id"
LEFT JOIN "support" su ON su."id" = sj."support_id"
LEFT JOIN "funding_join" fj ON fj."resource_id" = r."id"
LEFT JOIN "funding" f ON f."id" = fj."funding_id"
GROUP BY
    r."id",
    o."name",
    o."id",
    s."name",
    s."id",
    e."title",
    e."id";
`;

const algoliaSave = () => {
    pool.query(algoliaQuery)
        .then(result => {
            index.saveObjects(result.rows)
                .then(() => console.log('Resources indexed successfully'))
                .catch(error => console.error('Error indexing resources:', error));
        })
        .catch(err => console.error('Error fetching data:', err));
};


// ***** RESOURCE *****

// Route to add a new resource for the admin
// This endpoint is a POST request that inserts a new resource into the 'resource' table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.post('/', rejectUnauthenticated, isAdmin, async (req, res) => {

    // The request body should contain the new resource's details
    const newResource = req.body;

    let entrepreneurId = newResource.entrepreneur_id

    if (entrepreneurId == 0) {
        entrepreneurId = null;
    }
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
                entrepreneurId,
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
        algoliaSave();
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
    let entrepreneurId = updatedResource.entrepreneur_id

    if (entrepreneurId == 0) {
        entrepreneurId = null;
    }

    console.log(req.body);
    const deleteSupport = `DELETE FROM "support_join" WHERE "resource_id"=$1`
    const deleteFunding = `DELETE FROM "funding_join" WHERE "resource_id"=$1`

    // const supportDeleteIds = [];
    // const fundingDeleteIds = [];

    // Loop for handling deletes
    if (updatedResource.support) {
        for (s of updatedResource.support) {
            await pool.query(deleteSupport, [resourceId])
        }
    }

    if (updatedResource.funding) {
        for (f of updatedResource.funding) {
            await pool.query(deleteFunding, [resourceId])
        }
    }

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
            entrepreneurId,
            updatedResource.name,
            updatedResource.image_url,
            updatedResource.description,
            updatedResource.website,
            updatedResource.email,
            updatedResource.address,
            updatedResource.linkedin,
            resourceId
        ]);
        console.log('resource succ')

        // Loop for handling inserts
        if (updatedResource.support) {
            for (s of updatedResource.support) {
                if (s != 0) {
                    const supportQuery = `INSERT INTO "support_join"("support_id", "resource_id") VALUES($1, $2)`;
                    await pool.query(supportQuery, [s, resourceId]);
                    console.log("support update success")
                }
            }
        }


        if (updatedResource.funding) {
            for (f of updatedResource.funding) {
                if (f != 0) {
                    const fundingQuery = `INSERT INTO "funding_join"("funding_id", "resource_id") VALUES($1, $2)`;
                    await pool.query(fundingQuery, [f, resourceId]);
                    console.log("funding update success")
                }
            }
        }


        // Update the Algolia index
        algoliaSave();
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
    const resourceText = 'DELETE FROM resource WHERE id =$1;';
    const supportText = `DELETE FROM support_join WHERE resource_id=$1;`;
    const fundingText = `DELETE FROM funding_join WHERE resource_id=$1;`;
    try {
        await pool.query(supportText, [req.params.id]);
        await pool.query(fundingText, [req.params.id]);
        await pool.query(resourceText, [req.params.id]);
        // Upon successful delete, delete object from algolia index
        index.deleteObject(req.params.id)
        // Send a 200 status code to the client to indicate that the request was successful
        console.log('Successfully deleted resource')
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
    const queryText = "INSERT INTO stage (name) VALUES ($1)";
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
    const queryText = "INSERT INTO support (title) VALUES ($1)";
    try {
        // Execute the SQL query
        await pool.query(queryText, [newSupport.title]);
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
    const queryText = 'UPDATE support SET title = $1, description = $2 WHERE id = $3';
    try {
        // Execute the SQL query
        await pool.query(queryText, [updatedSupport.title, updatedSupport.description, req.params.id]);
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
    const queryText = "INSERT INTO funding (title) VALUES ($1)";
    try {
        // Execute the SQL query
        await pool.query(queryText, [newFunding.title]);
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
    const queryText = 'UPDATE funding SET title = $1, description = $2 WHERE id = $3';
    try {
        // Execute the SQL query
        await pool.query(queryText, [updatedFunding.title, updatedFunding.description, req.params.id]);
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
    const queryText = "INSERT INTO entrepreneur (title) VALUES ($1)";
    try {
        // Execute the SQL query
        await pool.query(queryText, [newEntrepreneur.title]);
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
    const queryText = 'UPDATE entrepreneur SET title = $1, description = $2 WHERE id = $3';
    try {
        // Execute the SQL query
        await pool.query(queryText, [updatedEntrepreneur.title, updatedEntrepreneur.description, req.params.id]);
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