const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const rejectUnauthenticated = require('../modules/authentication-middleware')

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

// GET req for all articles
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "article";`
    pool.query(queryText)
        .then(result => res.send(result.rows))
        .catch(err => {
            console.log("Error on article list GET", err);
            res.sendStatus(500);
        })
});

// GET req for individual article
router.get('/:title', (req, res) => {
    let queryText = `SELECT * FROM "article" WHERE "title" = $1;`
    pool.query(queryText, [req.params.title])
        .then(result => res.send(result.rows))
        .catch(err => {
            console.log("Error on individual article GET", err);
            res.sendStatus(500);
        })
});

// POST req for admin to post new article
router.post('/', isAdmin, (req, res) => {
    let queryText = `INSERT INTO "article"("title","author","body","image_url")
    VALUES($1, $2, $3, $4)`
    pool.query(queryText, [req.body.title, req.body.author, req.body.body, req.body.image_url])
        .then(result => res.sendStatus(201))
        .catch(err => {
            console.log("Error posting new article", err);
            res.sendStatus(500);
        })
});

// DELETE req for admin to delete article
router.delete('/:id', isAdmin, (req, res) => {
    let queryText = `DELETE FROM "article" WHERE "id" = $1;`
    pool.query(queryText, [req.params.id])
        .then(result => res.sendStatus(204))
        .catch(err => {
            console.log("Error on article DELETE", err);
            res.sendStatus(500);
        })
});

// POST req for admin to post new article
router.put('/:id', isAdmin, (req, res) => {
    let queryText = `UPDATE "article" SET "title"=$1,"author"=$2,"body"=$3,"image_url"=$4 WHERE "id" = $5`
    pool.query(queryText, [req.body.title, req.body.author, req.body.body, req.body.image_url, req.params.id])
        .then(result => res.sendStatus(200))
        .catch(err => {
            console.log("Error posting new article", err);
            res.sendStatus(500);
        })
});

module.exports = router;
