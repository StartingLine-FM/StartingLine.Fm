const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const filterSearchThroughCategory = require('../modules/category.module');
const specificSearch = require('../modules/specific-text.module');
const fetchBusinessesByStage = require('../modules/stage.module');

router.get('/', (req, res) => {
    let queryText = '';
    let categoryQuery = req.query.category;
    let stageQuery = req.query.category;
    let textQuery = req.query.text;

    console.log(req.query);

    switch (req.query) {
        case categoryQuery && !stageQuery && !textQuery:
            // only catergoryQuery
            queryText = `SELECT * FROM "resource" WHERE ${filterSearchThroughCategory(categoryQuery)}`;
            break;

        case !categoryQuery && stageQuery && !textQuery:
            // only stageQuery
            queryText = `SELECT * FROM "resource" WHERE ${fetchBusinessesByStage(stageQuery)}`;
            break;

        case !categoryQuery && !stageQuery && textQuery:
            // only textQuery
            queryText = `SELECT * FROM "resource" WHERE ${specificSearch(textQuery)}`;
            break;

        case categoryQuery && stageQuery && !textQuery:
            // categoryQuery and stageQuery
            queryText = `SELECT * FROM "resource" WHERE ${filterSearchThroughCategory(categoryQuery)} OR ${fetchBusinessesByStage(stageQuery)}`;
            break;

        case categoryQuery && !stageQuery && textQuery:
            // categoryQuery and textQuery
            queryText = `SELECT * FROM "resource" WHERE ${filterSearchThroughCategory(categoryQuery)} OR ${specificSearch(textQuery)}`;
            break;

        case !categoryQuery && stageQuery && textQuery:
            // stageQuery and textQuery
            queryText = `SELECT * FROM "resource" WHERE ${specificSearch(textQuery)} OR ${fetchBusinessesByStage(stageQuery)}`;
            break;

        case categoryQuery && stageQuery && textQuery:
            // all three
            queryText = `SELECT * FROM "resource" WHERE ${filterSearchThroughCategory(categoryQuery)} OR ${fetchBusinessesByStage(stageQuery)} OR ${specificSearch(textQuery)}`;
            break;

        default:
            queryText = `SELECT * FROM "resource" ORDER BY "name";`
            break;
    }

    if (req.query = {}) {
        pool.query(queryText)
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router GET", err);
                res.sendStatus(500);
            });
    } else
        pool.query(queryText, [req.query])
            .then(result => {
                res.send(result.rows);
            })
            .catch(err => {
                console.log("Error on search.router GET", err);
                res.sendStatus(500);
            });

})

module.exports = router;