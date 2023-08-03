const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
//rejectUnauthenticated gives the admin page some sercurity 
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

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

//Route to (POST), add a resource for the admin
router.post('/', rejectUnauthenticated, isAdmin, async (req, res) => {
    const newResource = req.body;
    // SQL query to add new resource to the database
    const queryText = 'INSERT INTO resource(stage_id, category_id, name, image_url, description, website, email, address, linkedin) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    try {
        // Try to execute the query(add new resource), if successful send a 201 status
        await pool.query(queryText, [newResource.stage_id, newResource.category_id, newResource.name, newResource.image_url, newResource.description, newResource.website, newResource.email, newResource.address, newResource.linkedin]);
        res.sendStatus(201);
    } catch (err) {
        // If an error occurs, log it and send a 500 status
        console.log('Error adding resource', err);
        res.sendStatus(500);
    }
});

// Route to add a new resource for the admin
// This endpoint is a POST request that inserts a new resource into the 'resource' table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.post('/', rejectUnauthenticated, isAdmin, async (req, res) => {
    // The request body should contain the new resource's details
    const newResource = req.body;
    // The SQL query to insert a new resource
    const queryText = 'INSERT INTO resource(stage_id, category_id, name, image_url, description, website, email, address, linkedin) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    try {
        // Execute the SQL query
        await pool.query(queryText, [newResource.stage_id, newResource.category_id, newResource.name, newResource.image_url, newResource.description, newResource.website, newResource.email, newResource.address, newResource.linkedin]);
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
    const queryText = 'UPDATE resource SET stage_id = $1, category_id = $2, name = $3, image_url = $4, description = $5, website = $6, email = $7, address = $8, linkedin = $9 WHERE id = $10';
    try {
        // Execute the SQL query
        await pool.query(queryText, [updatedResource.stage_id, updatedResource.category_id, updatedResource.name, updatedResource.image_url, updatedResource.description, updatedResource.website, updatedResource.email, updatedResource.address, updatedResource.linkedin, req.params.id]);
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

// Route to fetch all categories
// This endpoint is a GET request that retrieves all categories from the category table in the database. 
// After executing the SQL query, it sends back the resulting rows to the client as a response.
router.get('/categories', async (req, res) => {
    try {
        // The SQL query to retrieve all categories
        const queryText = 'SELECT * FROM category';
        // Execute the SQL query
        const result = await pool.query(queryText);
        // Send the result to the client
        res.send(result.rows);
    } catch (error) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error fetching categories', error);
        res.sendStatus(500);
    }
});

//Route to add a new category for the admin
// This endpoint is a POST request that adds a new category to the category table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.post('/categories', rejectUnauthenticated, isAdmin, async (req, res) => {
    // The request body should contain the new category details
    const newCategory = req.body;
    // The SQL query to insert a new category
    const queryText = 'INSERT INTO category (name) VALUES ($1)';
    try {
        // Execute the SQL query
        await pool.query(queryText, [newCategory.name]);
        // Send a 201 status code to the client to indicate that the resource was successfully created
        res.sendStatus(201);
    } catch (err) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error adding category', err);
        res.sendStatus(500);
    }
});

// Route to update a category for the admin
// This endpoint is a PUT request that updates the details of an existing category in the category table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.put('/categories/:id', rejectUnauthenticated, isAdmin, async (req, res) => {
    // The request body should contain the updated category details
    const updatedCategory = req.body;
    // The SQL query to update a category
    const queryText = 'UPDATE category SET name = $1 WHERE id = $2';
    try {
        // Execute the SQL query
        await pool.query(queryText, [updatedCategory.name, req.params.id]);
        // Send a 200 status code to the client to indicate that the request was successful
        res.sendStatus(200);
    } catch (err) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error updating category', err);
        res.sendStatus(500);
    }
});

// Route to delete a category for the admin
// This endpoint is a DELETE request that removes an existing category from the category table in the database.
// It first checks if the user is authenticated and has admin privileges using the rejectUnauthenticated and isAdmin middleware.
router.delete('/categories/:id', rejectUnauthenticated, isAdmin, async (req, res) => {
    // The SQL query to delete a category
    const queryText = 'DELETE FROM category WHERE id = $1';
    try {
        // Execute the SQL query
        await pool.query(queryText, [req.params.id]);
        // Send a 200 status code to the client to indicate that the request was successful
        res.sendStatus(200);
    } catch (err) {
        // Log the error and send a 500 status code to the client if an error occurs
        console.log('Error deleting category', err);
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
    const queryText = "INSERT INTO stage (name, description) VALUES ($1, $2)";
    try {
        // Execute the SQL query
        await pool.query(queryText, [newStage.name, newStage.description]);
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