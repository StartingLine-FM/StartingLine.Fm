const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const filterSearchThroughCategory = require('../modules/category.module');
const specificSearch = require('../modules/specific-text.module');
const fetchBusinessesByStage = require('../modules/stage.module');

router.get('/', (req, res) => {
    let queryText = '';
    let categoryQuery = req.query.category;
    let stageQuery = req.query.stage;
    let textQuery = req.query.text;

    // variable to add an ORDER BY clause to the end of a query via the req.body.order key
    // for the front-end functionality of this, I'd like to look into adding onto the string via the spread operator
    // so we can ORDER BY multiple parameters
    // ex. ORDER BY "stage_id" DESC 
    let orderText = `ORDER BY ${req.body.order};`


    // conditional to return queryText based on what's searched for using req.query
    if (categoryQuery && !stageQuery && !textQuery) {
        // only category
        queryText = `SELECT * FROM "resource" WHERE ${filterSearchThroughCategory(categoryQuery)}`;
        // declaring the final query as one of 2 options:
        // if there's no req.body.order statement provided, the queryText above is sent with a default ORDER BY.
        // if there IS a provided req.body.order statement, add that to the end of the queryText to make the finalQuery.
        let finalQuery = !req.body.order ? `${queryText} ORDER BY "name";` : `${queryText} ${orderText};`;
        pool.query(finalQuery)
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router GET", err);
                res.sendStatus(500);
            });

    } else if (!categoryQuery && stageQuery && !textQuery) {
        
        // only stage
        queryText = `SELECT * FROM "resource" WHERE ${fetchBusinessesByStage(stageQuery)}`;
        
        // declaring the final query as one of 2 options:
        // if there's no req.body.order statement provided, the queryText above is sent with a default ORDER BY.
        // if there IS a provided req.body.order statement, add that to the end of the queryText to make the finalQuery.
        let finalQuery = !req.body.order ? `${queryText} ORDER BY "name";` : `${queryText} ${orderText};`;
        
        pool.query(finalQuery)
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log(stageQuery, queryText, "Error on search.router GET", err);
                res.sendStatus(500);
            });

    } else if (!categoryQuery && !stageQuery && textQuery) {
       
        // only text
        queryText = `SELECT * FROM "resource" WHERE ${specificSearch()}`;
       
        // declaring the final query as one of 2 options:
        // if there's no req.body.order statement provided, the queryText above is sent with a default ORDER BY.
        // if there IS a provided req.body.order statement, add that to the end of the queryText to make the finalQuery.
        let finalQuery = !req.body.order ? `${queryText} ORDER BY ${specificSearch()};` : `${queryText} ${orderText};`;
       
        pool.query(finalQuery, [textQuery])
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router GET", err);
                res.sendStatus(500);
            });

    } else if (categoryQuery && stageQuery && !textQuery) {
       
        // category and stage
        queryText = `SELECT * FROM "resource" WHERE ${filterSearchThroughCategory(categoryQuery)} AND (${fetchBusinessesByStage(stageQuery)})`;
       
        // declaring the final query as one of 2 options:
        // if there's no req.body.order statement provided, the queryText above is sent with a default ORDER BY.
        // if there IS a provided req.body.order statement, add that to the end of the queryText to make the finalQuery.
        let finalQuery = !req.body.order ? `${queryText} ORDER BY "name";` : `${queryText} ${orderText};`;
       
        pool.query(finalQuery)
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router GET", err);
                res.sendStatus(500);
            });

    } else if (categoryQuery && !stageQuery && textQuery) {
       
        // category and text
        queryText = `SELECT * FROM "resource" WHERE ${filterSearchThroughCategory(categoryQuery)} AND ${specificSearch()}`;
       
        // declaring the final query as one of 2 options:
        // if there's no req.body.order statement provided, the queryText above is sent with a default ORDER BY.
        // if there IS a provided req.body.order statement, add that to the end of the queryText to make the finalQuery.
        let finalQuery = !req.body.order ? `${queryText} ORDER BY ${specificSearch()};` : `${queryText} ${orderText};`;
       
        pool.query(finalQuery, [textQuery])
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router GET", err);
                res.sendStatus(500);
            });

    } else if (!categoryQuery && stageQuery && textQuery) {
       
        // stage and text
        queryText = `SELECT * FROM "resource" WHERE ${specificSearch()} AND (${fetchBusinessesByStage(stageQuery)})`;
       
        // declaring the final query as one of 2 options:
        // if there's no req.body.order statement provided, the queryText above is sent with a default ORDER BY.
        // if there IS a provided req.body.order statement, add that to the end of the queryText to make the finalQuery.
        let finalQuery = !req.body.order ? `${queryText} ORDER BY ${specificSearch()};` : `${queryText} ${orderText};`;
       
        pool.query(finalQuery, [textQuery])
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router GET", err);
                res.sendStatus(500);
            });

    } else if (categoryQuery && stageQuery && textQuery) {
       
        // category, stage, and text all specified
        queryText = `SELECT * FROM "resource" WHERE ${filterSearchThroughCategory(categoryQuery)} AND (${fetchBusinessesByStage(stageQuery)}) AND ${specificSearch()}`;
       
        // declaring the final query as one of 2 options:
        // if there's no req.body.order statement provided, the queryText above is sent with a default ORDER BY.
        // if there IS a provided req.body.order statement, add that to the end of the queryText to make the finalQuery.
        let finalQuery = !req.body.order ? `${queryText} ORDER BY ${specificSearch()};` : `${queryText} ${orderText};`;
       
        pool.query(finalQuery, [textQuery])
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router GET", err);
                res.sendStatus(500);
            });

    } else {
       
        // default
        queryText = `SELECT * FROM "resource"`;
        
        // declaring the final query as one of 2 options:
        // if there's no req.body.order statement provided, the queryText above is sent with a default ORDER BY.
        // if there IS a provided req.body.order statement, add that to the end of the queryText to make the finalQuery.
        let finalQuery = !req.body.order ? `${queryText} ORDER BY "name";` : `${queryText} ${orderText};`;
        
        pool.query(finalQuery)
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router GET", err);
                res.sendStatus(500);
            });
    }
});

module.exports = router;
