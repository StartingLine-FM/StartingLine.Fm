const express = require('express');
const router = express.Router();
const pool = require('../modules/pool'); 
//rejectUnauthenticated gives the admin page some sercurity 
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//middleware that checks if the user has admin privileges 
const isAdmin = (req, res, next) => {
    if (req.user && req.user.admin) {
      next();
    } else {
      res.status(403).json({ message: 'You do not have admin access.' });
    }
  };

//Route to (POST), add a resource for the admin
router.post('/', rejectUnauthenticated, isAdmin, async (req, res) => {
    const newResource = req.body;
    //query text to insert new resource 
    const queryText = 'INSERT INTO resource(stage_id, category_id, name, image_url, description, website, email, address, linkedin) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    try {
        //adds the new resource 
        await pool.query(queryText, [newResource.stage_id, newResource.category_id, newResource.name, newResource.image_url, newResource.description, newResource.website, newResource.email, newResource.address, newResource.linkedin]);
        res.sendStatus(201);
    } catch (err) {
        console.log('Error adding resource', err);
        res.sendStatus(500);
    }
});
//Route to (PUT), update a resource for the admin
router.put('/:id', rejectUnauthenticated, isAdmin, async (req,res) => {
    const updatedResource = req.body;
    //query text to update a resource already on the app
    const queryText = 'UPDATE resource SET stage = $1, category = $2, name = $3, image_url = $4, description = $5, website = $6, email = $7, address = $8, linkedin = $9 WHERE id = $10';
    try {
        //updates the resource based on the id
        await pool.query(queryText, [updatedResource.stage_id, updatedResource.category_id, updatedResource.name, updatedResource.image_url, updatedResource.description, updatedResource.website, updatedResource.email, updatedResource.address, updatedResource.linkedin, req.params.id]);
        res.sendStatus(200);
    } catch (err) {
        console.log('Error updating resource', err);
        res.sendStatus(500);
    }
});
//Route to (DELETE), a resource for the admin
router.delete('/:id', rejectUnauthenticated, isAdmin, async (req,res) => {
    //query text to delete a resource 
    const queryText = 'DELETE FROM resource WHERE id =$1';
    try {
        //deletes the resource based on the id
        await pool.query(queryText, [req.params.id]);
        res.sendStatus(200);
    } catch (err) {
        console.log('Error deleting resource', err);
        res.sendStatus(500);
    }
});

//Route to (POST) add a new category for the admin
router.post('/categories', rejectUnauthenticated, isAdmin, async (req, res) => {
    const newCategory = req.body;
    const queryText = 'INSERT INTO category (name) VALUES ($1)';
    try {
        await pool.query(queryText, [newCategory.name]);
        res.sendStatus(201);
    } catch (err) {
        console.log('Error adding category', err);
        res.sendStatus(500);
    }
});
//Route to (POST) add a new stage for the admin
router.post('/stages', rejectUnauthenticated, isAdmin, async (req, res) => {
    const newStage = req.body;
    const queryText = "INSERT INTO stage (name, description) VALUES ($1, $2)";
    try {
        await pool.query(queryText, [newStage.name, newStage.description]);
        res.sendStatus(201);
    } catch (err) {
        console.log('Error adding stage', err);
        res.sendStatus(500);
    }
});

module.exports = router;