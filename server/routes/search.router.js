const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const specificSearch = require('../modules/specific-text.module');

router.get('/', (req, res) => {
    let queryText = '';
    let categoryQuery = req.query.category;
    let stageQuery = req.query.stage;
    let textQuery = req.query.text;

    // conditional to return queryText based on what's searched for using req.query
    if (categoryQuery && !stageQuery && !textQuery) {

        // only category
        queryText = `SELECT "resource"."id", "resource"."name", "resource"."description", "image_url", "category_id", "category"."name" AS "category_name", "stage_id", "stage"."name" AS "stage_name", "website",
"email", "linkedin", "address" FROM "resource"
JOIN "category" ON "category"."id" = "resource"."category_id"
JOIN "stage" ON "stage"."id" = "resource"."stage_id" WHERE "category_id"=$1 ORDER BY "name";`;
        pool.query(queryText, [categoryQuery])
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router category GET", err);
                res.sendStatus(500);
            })

    } else if (!categoryQuery && stageQuery && !textQuery) {

        // only stage
        queryText = `SELECT "resource"."id", "resource"."name", "resource"."description", "image_url", "category_id", "category"."name" AS "category_name", "stage_id", "stage"."name" AS "stage_name", "website",
"email", "linkedin", "address" FROM "resource"
JOIN "category" ON "category"."id" = "resource"."category_id"
JOIN "stage" ON "stage"."id" = "resource"."stage_id"
 WHERE "stage_id"=$1 OR "stage_id"=1
 ORDER BY "name";`;

        pool.query(queryText, [stageQuery])
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log(stageQuery, queryText, "Error on search.router stage GET", err);
                res.sendStatus(500);
            });

    } else if (!categoryQuery && !stageQuery && textQuery) {

        // only text
        queryText = `SELECT "resource"."id", "resource"."name", "resource"."description", "image_url", "category_id", "category"."name" AS "category_name", "stage_id", "stage"."name" AS "stage_name", "website",
        "email", "linkedin", "address" FROM "resource"
        JOIN "category" ON "category"."id" = "resource"."category_id"
        JOIN "stage" ON "stage"."id" = "resource"."stage_id" 
        WHERE ${specificSearch("text only", '$1')} 
        ORDER BY "resource"."name";`;

        pool.query(queryText, [textQuery])
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router text GET", err);
                res.sendStatus(500);
            });

    } else if (categoryQuery && stageQuery && !textQuery) {

        // category and stage
        queryText = `SELECT "resource"."id", "resource"."name", "resource"."description", "image_url", "category_id", "category"."name" AS "category_name", "stage_id", "stage"."name" AS "stage_name", "website",
        "email", "linkedin", "address" FROM "resource"
        JOIN "category" ON "category"."id" = "resource"."category_id"
        JOIN "stage" ON "stage"."id" = "resource"."stage_id" 
                WHERE "category_id"=$1 
                AND ("stage_id"=$2 OR "stage_id"=1)
                ORDER BY "name";`;

        pool.query(queryText, [categoryQuery, stageQuery])
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router category and stage GET", err);
                res.sendStatus(500);
            });

    } else if (categoryQuery && !stageQuery && textQuery) {

        // category and text
        queryText = `SELECT "resource"."id", "resource"."name", "resource"."description", "image_url", "category_id", "category"."name" AS "category_name", "stage_id", "stage"."name" AS "stage_name", "website",
        "email", "linkedin", "address" FROM "resource"
JOIN "category" ON "category"."id" = "resource"."category_id"
JOIN "stage" ON "stage"."id" = "resource"."stage_id"
        WHERE "category_id"=$1 
        AND (${specificSearch("combined", '$2')})
        ORDER BY "resource"."name";`;

        pool.query(queryText, [categoryQuery, textQuery])
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router category and text GET", err);
                res.sendStatus(500);
            });

    } else if (!categoryQuery && stageQuery && textQuery) {

        // stage and text
        queryText = `SELECT "resource"."id", "resource"."name", "resource"."description", "image_url", "category_id", "category"."name" AS "category_name", "stage_id", "stage"."name" AS "stage_name", "website",
        "email", "linkedin", "address" FROM "resource"
JOIN "category" ON "category"."id" = "resource"."category_id"
JOIN "stage" ON "stage"."id" = "resource"."stage_id" 
        WHERE (${specificSearch("combined", '$1')})
        AND ("stage_id"=$2 OR "stage_id"=1) 
        ORDER BY "resource"."name";`;

        pool.query(queryText, [stageQuery, textQuery])
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router stage and text GET", err);
                res.sendStatus(500);
            });

    } else if (categoryQuery && stageQuery && textQuery) {

        // category, stage, and text all specified
        queryText = `SELECT "resource"."id", "resource"."name", "resource"."description", "image_url", "category_id", "category"."name" AS "category_name", "stage_id", "stage"."name" AS "stage_name", "website",
        "email", "linkedin", "address" FROM "resource"
JOIN "category" ON "category"."id" = "resource"."category_id"
JOIN "stage" ON "stage"."id" = "resource"."stage_id"
        WHERE "category_id"=$1 
        AND ("stage_id"=$2 OR "stage_id"=1) 
        AND (${specificSearch("combined", '$3')})
        ORDER BY "resource"."name";`;

        pool.query(queryText, [categoryQuery, stageQuery, textQuery])
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router category stage text GET", err);
                res.sendStatus(500);
            });

    } else {

        // default
        queryText = `SELECT "resource"."id", "resource"."name", "resource"."description", "image_url", "category_id", "category"."name" AS "category_name", "stage_id", "stage"."name" AS "stage_name", "website",
        "email", "linkedin", "address" FROM "resource"
JOIN "category" ON "category"."id" = "resource"."category_id"
JOIN "stage" ON "stage"."id" = "resource"."stage_id" ORDER BY "name";`;

        pool.query(queryText)
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router default GET", err);
                res.sendStatus(500);
            });
    }
});

module.exports = router;