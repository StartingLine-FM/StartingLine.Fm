const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();


// get to grab the users todo lists by title
// router.get('/', async (req, res) => {
//   try {
//     const user_id = req.user.id
//     // grab title from params
//     const queryText = `SELECT "title" FROM "todo" WHERE "user_id"=$1;`;
//     // send off query text
//     const response = await pool.query(queryText, [user_id]);
//     console.log(response.data) // check the response data
//     res.status(200).send(response.rows); // send back the matching todo list
//   } catch (error) {
//     console.log('there was an error GETTING from the todo list', error);
//   }
// })


router.post(`/:resource_id/:title_table_id`, async (req, res) => {
  try {
    // get id fromt the user
    const user_id = req.user.id;
    // grab title id from params
    const title_table_id = req.params.title_table_id;
    // grab the resource id from req.params
    const resource_id = req.params.resource_id;
    // query text to make a new item on the todo list
    const queryText = `INSERT INTO "todo" ("user_id", "resource_id", "notes", "completed", "title_table_id") VALUES ($1, $2, $3, $4, $5);`;
    // send off query text and get a response
    const response = await pool.query(queryText, [user_id, resource_id, req.body.notes, req.body.completed, title_table_id]);
    console.log(response.data);
    res.status(201).send(response.rows);
  } catch (error) {
    console.log('there was an error POSTING to the todo list', error);
  }
});

router.put('/:resource_id/:title_table_id', rejectUnauthenticated, async (req, res) => {
  try {
    // grab the user id from req.params
    const user_id = req.user.id;
    // grab the resource id from params
    const resource_id = req.params.resource_id;
    // create query text to update the data
    const queryText = `UPDATE "todo" SET 
      "title" = $1,
       "notes" = $2,
       "completed" = $3
       WHERE "resource_id" = $4;`;

    const response = await pool.query(queryText,
      [req.body.title,
      req.body.notes,
      req.body.completed,
        resource_id])
    console.log(response.data)
    res.status(204).send(response.rows)
  } catch (error) {
    console.log('there was an error PUTTING to the todo list', error)
  }
})

// delete for a resource
router.delete('/resource/:resource_id/:title_table_id', rejectUnauthenticated, async (req, res) => {
  try {
    // grab the resource_id from req.params
    const resource_id = req.params.resource_id;
    // grab title table id
    const title_table_id = req.params.title_table_id;
    // query text to send to the backend
    const queryText = `DELETE FROM "todo" WHERE "resource_id" = $1 AND "title_table_id" = $2;`;
    // send off query text
    const response = await pool.query(queryText, [resource_id, title_table_id]);
    console.log(response.data);
    res.status(204).send(response.rows);
  } catch (error) {
    console.log('there was an error DELETING from the todo list', error);
  }
})

// delete for a whole todo list
router.delete('/:title_table_name', rejectUnauthenticated, async (req, res) => {
  try {
    const user_id = req.user.id
    // grab the title from req.params
    const title_table_name = req.params.title_table_name
    // query text to send to the backend
    const queryText = `DELETE FROM "title_table" WHERE "title" = $1;`;
    // send off query text
    const response = await pool.query(queryText, [title_table_name]);
    console.log(response.data);
    res.status(204).send(response.rows);
  } catch (error) {
    console.log('there was an error DELETING from the todo list', error);
  }
})


// get for grabbing the resources based on the todo list
router.get(`/user/todolist/resources/:title_table_id`, (req, res) => {
    // get user id
    const id = req.user.id;
    // grab the title for the resource
    const title_table_id = req.params.title_table_id
    console.log(id, title_table_id);
    const queryText = `SELECT todo.notes, todo.completed, todo.title_table_id, todo.resource_id,
    resource.name AS resource_name,
    resource.image_url, resource.description AS resource_description,
    resource.website, resource.email, resource.address, resource.linkedin
FROM todo
JOIN resource ON resource.id = todo.resource_id
JOIN stage ON stage.id = resource.stage_id
JOIN category ON category.id = resource.category_id
WHERE todo.user_id = $1
AND todo.title_table_id = $2;`;
    pool.query(queryText, [id, title_table_id]).then(response => {

      res.status(200).send(response.rows);
      console.log(response.rows)
    }).catch((err) => {

      console.log('there was an error getting the resource', err)
    })
  })


// get to grab titles
router.get('/titles',async (req, res) => {
    try {
      const user_id = req.user.id;
      // create query text
      const queryText = `SELECT * FROM "title_table" WHERE user_id = $1;`;
      // send back response
      const response = await pool.query(queryText, [user_id]);
      console.log(response.data); // check the data
      res.status(200).send(response.rows) // send the response
    } catch (error) {
      console.log('error getting the titles', error)
    }
})

router.post('/title',rejectUnauthenticated, async (req, res) => {
  try {
    // get user 
    const user_id = req.user.id;
    // grab title
    const title = req.body.title;
    // make query
    const queryText= `INSERT INTO "title_table" ("title", "user_id") VALUES ($1, $2);`;
    // make response to send back
    const response = await pool.query(queryText, [title, user_id]);
    console.log(response.data);
    res.status(201).send(response.rows)
  } catch (error) {
    console.log('there was an error posting a title', error)
  }
})

module.exports = router;