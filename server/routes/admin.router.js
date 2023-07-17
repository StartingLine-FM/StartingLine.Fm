const express = require('express');
const router = express.Router();
const pool = require('../modules/pool'); 
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

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
    const queryText = 'INSERT INTO resource(stage_id, catergory_id, name, image_url, description, website, email, address, linkedin) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    try {
        await pool.query(queryText, [newResource.stage_id, newResource.category_id, newResource.name, newResource.image_url, newResource.description, newResource.website, newResource.email, newResource.address, newResource.linkedin]);
        res.sendStatus(201);
    } catch (err) {
        console.log('Error adding resource', err);
        res.sendStatus(500);
    }
});
//Route to (PUT), update a resource for the admin

//Route to (DELETE), a resource for the admin



module.exports = router;