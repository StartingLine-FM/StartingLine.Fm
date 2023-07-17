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

    console.log(req.query);

    if (categoryQuery && !stageQuery && !textQuery) {
        // only category
        queryText = `SELECT * FROM "resource" WHERE ${filterSearchThroughCategory(categoryQuery)};`;
        pool.query(queryText)
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router GET", err, queryText, req.query);
                res.sendStatus(500);
            });

    } else if (!categoryQuery && stageQuery && !textQuery) {
        // only stage
        queryText = `SELECT * FROM "resource" WHERE ${fetchBusinessesByStage(stageQuery)};`;
        pool.query(queryText)
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log(stageQuery, queryText, "Error on search.router GET", err);
                res.sendStatus(500);
            });

    } else if (!categoryQuery && !stageQuery && textQuery) {
        // only text
        queryText = `SELECT * FROM "resource" WHERE ${specificSearch(textQuery, `$1`)};`;
        pool.query(queryText, [textQuery])
            .then(result => {
                console.log(queryText, textQuery)
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router GET", err);
                res.sendStatus(500);
            });

    } else if (categoryQuery && stageQuery && !textQuery) {
        // category and stage
        queryText = `SELECT * FROM "resource" WHERE ${filterSearchThroughCategory(categoryQuery)} AND (${fetchBusinessesByStage(stageQuery)});`;
        pool.query(queryText)
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router GET", err);
                res.sendStatus(500);
            });

    } else if (categoryQuery && !stageQuery && textQuery) {
        // category and text
        queryText = `SELECT * FROM "resource" WHERE ${filterSearchThroughCategory(categoryQuery)} AND ${specificSearch(textQuery, `$1`)};`;
        pool.query(queryText, [textQuery])
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router GET", err);
                res.sendStatus(500);
            });

    } else if (!categoryQuery && stageQuery && textQuery) {
        // stage and text
        queryText = `SELECT * FROM "resource" WHERE ${specificSearch(textQuery, `$1`)} AND (${fetchBusinessesByStage(stageQuery)});`;
        pool.query(queryText, [textQuery])
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router GET", err);
                res.sendStatus(500);
            });

    } else if (categoryQuery && stageQuery && textQuery) {
        // category, stage, and text
        queryText = `SELECT * FROM "resource" WHERE ${filterSearchThroughCategory(categoryQuery)} AND (${fetchBusinessesByStage(stageQuery)}) AND ${specificSearch(textQuery, `$1`)};`;
        pool.query(queryText, [textQuery])
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router GET", err);
                res.sendStatus(500);
            });
            
    } else {
        // default, ordered by name
        console.log(req.query);
        queryText = `SELECT * FROM "resource" ORDER BY "name";`;
        pool.query(queryText)
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router GET", err, queryText, req.query);
                res.sendStatus(500);
            });
    }
});

module.exports = router;
