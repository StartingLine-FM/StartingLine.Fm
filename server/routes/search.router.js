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

    // conditional to return queryText based on what's searched for using req.query
    if (categoryQuery && !stageQuery && !textQuery) {

        // only category
        queryText = `SELECT * FROM "resource" WHERE ${filterSearchThroughCategory(categoryQuery)} ORDER BY "name"`;
        pool.query(queryText)
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router GET", err);
                res.sendStatus(500);
            })

    } else if (!categoryQuery && stageQuery && !textQuery) {

        // only stage
        queryText = `SELECT * FROM "resource" WHERE ${fetchBusinessesByStage(stageQuery)}`;

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
        queryText = `SELECT "resource"."id", "stage_id", "category_id", "resource"."name", "image_url", "resource"."description", "website", "email", "address", "linkedin", 
        "category"."name" AS "category_name", 
        "stage"."name" AS "stage_name" FROM "resource"
        JOIN "category" ON "category"."id" = "resource"."category_id"
        JOIN "stage" ON "stage"."id" = "resource"."stage_id" 
        WHERE ${specificSearch("text only")} 
        ORDER BY "resource"."name";`;

        pool.query(queryText, [textQuery])
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router GET", err);
                res.sendStatus(500);
            });

    } else if (categoryQuery && stageQuery && !textQuery) {

        // category and stage
        queryText = `SELECT * FROM "resource" 
        WHERE ${filterSearchThroughCategory(categoryQuery)} 
        AND (${fetchBusinessesByStage(stageQuery)})`;

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
        queryText = `SELECT * FROM "resource"
        WHERE ${filterSearchThroughCategory(categoryQuery)} 
        AND (${specificSearch("combined")})
        ORDER BY "resource"."name";`;

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
        queryText = `SELECT * FROM "resource" 
        WHERE (${specificSearch("combined")})
        AND (${fetchBusinessesByStage(stageQuery)}) 
        ORDER BY "resource"."name";`;

        pool.query(queryText, [textQuery])
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router GET", err);
                res.sendStatus(500);
            });

    } else if (categoryQuery && stageQuery && textQuery) {

        // category, stage, and text all specified
        queryText = `SELECT * FROM "resource"
        WHERE ${filterSearchThroughCategory(categoryQuery)} 
        AND (${fetchBusinessesByStage(stageQuery)}) 
        AND (${specificSearch("combined")})
        ORDER BY "resource"."name";`;

        pool.query(queryText, [textQuery])
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router GET", err);
                res.sendStatus(500);
            });

    } else {

        // default
        queryText = `SELECT * FROM "resource" ORDER BY "name"`;

        pool.query(queryText)
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