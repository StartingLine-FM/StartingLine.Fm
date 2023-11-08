const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
//rejectUnauthenticated gives the admin page some sercurity 
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
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

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_KEY);
const index = client.initIndex('resources')
const algoliaQuery =
    `SELECT
r."id" AS "objectID",
r."name",
r."description",
r."image_url",
o."name" AS "organization_name",
s."name" AS "stage_name",
e."title" AS "entrepreneur_title",
STRING_AGG("support"."title", ', ') AS "support_titles",
STRING_AGG("funding"."title", ', ') AS "funding_titles",
r."website",
r."email",
r."address",
r."linkedin"
FROM "resource" r
LEFT JOIN "organization" o ON o."id" = r."organization_id"
LEFT JOIN "stage" s ON s."id" = r."stage_id"
LEFT JOIN "entrepreneur" e ON e."id" = r."entrepreneur_id"
LEFT JOIN "support_join" sj ON r."id" = sj."resource_id"
LEFT JOIN "support" support ON sj."support_id" = support."id"
LEFT JOIN "funding_join" fj ON r."id" = fj."resource_id"
LEFT JOIN "funding" funding ON fj."funding_id" = funding."id"
GROUP BY r."id", o."name", s."name", e."title";`

const algoliaSave = () => {
    pool.query(algoliaQuery)
        .then(result => index.saveObjects(result.rows))
        .catch(err => console.log("Error on algolia saveObjects:", err));
}

// Route to add a new resource for the admin
// This endpoint is a POST request that inserts a new resource into the 'resource' table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.post('/', rejectUnauthenticated, isAdmin, async (req, res) => {

    // The request body should contain the new resource's details
    const newResource = req.body;

    // // instantiate the bling number as 9, because that's the determined key amount for the initial resourceQuery
    // let bling = 10

    // // function to be called when we need to increment bling
    // // this ensures our support and function queries will be sanitized no matter the amount of tags
    // function blingCounter() {
    //     return bling + 1
    // }
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
        // we'll send 'support' and 'funding' keys in the req.body as arrays of support_id or funding_id numbers
        // that way we can loop over them and make an insert statement for each tag needed per resource
        if (newResource.support) {
            for (id of newResource.support) {
                await pool.query(supportQuery, [id, resourceId])
            }
        }
        if (newResource.funding) {
            for (id of newResource.funding) {
                await pool.query(fundingQuery, [id, resourceId])
            }
        }
        // Upon successfull post, update the algolia index to reflect the newly added resource
        // algoliaSave();
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
    // The request body should contain the updated resource's details
    const updatedResource = req.body;
    // The SQL query to update a resource
    const queryText = 'UPDATE resource SET stage_id = $1, organization_id = $2, name = $3, image_url = $4, description = $5, website = $6, email = $7, address = $8, linkedin = $9 WHERE id = $10';
    try {
        // Execute the SQL query
        await pool.query(queryText, [updatedResource.stage_id, updatedResource.organization_id, updatedResource.name, updatedResource.image_url, updatedResource.description, updatedResource.website, updatedResource.email, updatedResource.address, updatedResource.linkedin, req.params.id]);
        // Send a 200 status code to the client to indicate that the request was successful
        res.sendStatus(200);
    } catch (err) {
        // Log the error and send a 500 status code to the client if an error occurs
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
        // Send a 200 status code to the client to indicate that the request was successful
        res.sendStatus(200);
    } catch (err) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error deleting resource', err);
        res.sendStatus(500);
    }
});

// Route to fetch all organisations
// This endpoint is a GET request that retrieves all organisations from the organization table in the database. 
// After executing the SQL query, it sends back the resulting rows to the client as a response.
router.get('/organisations', async (req, res) => {
    try {
        // The SQL query to retrieve all organisations
        const queryText = 'SELECT * FROM organization';
        // Execute the SQL query
        const result = await pool.query(queryText);
        // Send the result to the client
        res.send(result.rows);
    } catch (error) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error fetching organisations', error);
        res.sendStatus(500);
    }
});

//Route to add a new organization for the admin
// This endpoint is a POST request that adds a new organization to the organization table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.post('/organisations', rejectUnauthenticated, isAdmin, async (req, res) => {
    // The request body should contain the new organization details
    const neworganization = req.body;
    // The SQL query to insert a new organization
    const queryText = 'INSERT INTO organization (name) VALUES ($1)';
    try {
        // Execute the SQL query
        await pool.query(queryText, [neworganization.name]);
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
router.put('/organisations/:id', rejectUnauthenticated, isAdmin, async (req, res) => {
    // The request body should contain the updated organization details
    const updatedorganization = req.body;
    // The SQL query to update a organization
    const queryText = 'UPDATE organization SET name = $1 WHERE id = $2';
    try {
        // Execute the SQL query
        await pool.query(queryText, [updatedorganization.name, req.params.id]);
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
router.delete('/organisations/:id', rejectUnauthenticated, isAdmin, async (req, res) => {
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
    const queryText = 'UPDATE stage SET name = $1 WHERE id = $3';
    try {
        // Execute the SQL query
        await pool.query(queryText, [updatedStage.name, req.params.id]);
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

module.exports = router;