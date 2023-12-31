const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();


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
    res.status(201).send(response.rows);
  } catch (error) {
    // log the error
    console.log('there was an error POSTING to the todo list', error);
    res.sendStatus(500); // send status
  }
});

router.put('/:resource_id/:title_table_id', rejectUnauthenticated, async (req, res) => {
  try {
    // grab the user id from req.params
    const user_id = req.user.id;
    // grab the resource id from params
    const resource_id = req.params.resource_id;
    // grab the title table id
    const title_table_id = req.params.title_table_id;
    console.log(req.body)
    // create query text to update the data
    const queryText = `UPDATE "todo" SET 
       "notes" = $1,
       "completed" = $2
       WHERE "id"= $3;`;
    // create response for the pool
    const response = await pool.query(queryText,
      [req.body.notes,
      req.body.completed,
      req.body.todo_id])
    res.status(204).send(response.rows) // send the rows
  } catch (error) {
    // log the error 
    console.log('there was an error PUTTING to the todo list', error)
    res.sendStatus(500); // send status
  }
})

// delete for a resource
router.delete('/resource/:id/:title_table_id', rejectUnauthenticated, async (req, res) => {
  try {
    // grab the resource_id from req.params
    const id = req.params.id;
    // title id
    const title_table_id = req.params.title_table_id;
    // query text to send to the backend
    const queryText = `DELETE FROM "todo" WHERE "id" = $1;`;
    // send off query text
    const response = await pool.query(queryText, [id]);
    res.status(204).send(response.rows); // send the rows
  } catch (error) {
    // log the error
    console.log('there was an error DELETING from the todo list', error);
    res.sendStatus(500); // send response
  }
})

// delete for a whole todo list
router.delete('/:title_table_id', rejectUnauthenticated, async (req, res) => {
  try {
    const title_table_id = req.params.title_table_id;

    // Delete items from the todo list first
    const deleteTodoItemsQuery = `DELETE FROM "todo" WHERE "title_table_id" = $1;`;
    await pool.query(deleteTodoItemsQuery, [title_table_id]);

    // Delete the title from the title_table
    const deleteTitleQuery = `DELETE FROM "title_table" WHERE "id" = $1;`;
    await pool.query(deleteTitleQuery, [title_table_id]);
    res.sendStatus(204);  // send the status for nothing found
  } catch (error) {
    // log error if there is one
    console.log('there was an error DELETING from the todo list', error);
    res.sendStatus(500); // send status 
  }
});



// get for grabbing the resources based on the todo list
router.get(`/user/todolist/resources/:title_table_id`, (req, res) => {
  // get user id
  const id = req.user.id;
  // grab the title for the resource
  const title_table_id = req.params.title_table_id
  const queryText = `SELECT todo.notes, todo.id, todo.title_table_id, todo.resource_id, todo.completed, resource.name AS resource_name,
    resource.image_url, resource.description AS resource_description,
    resource.website, resource.email, resource.address, resource.linkedin
FROM todo
JOIN resource ON resource.id = todo.resource_id
JOIN stage ON stage.id = resource.stage_id
JOIN organization ON organization.id = resource.organization_id
WHERE todo.user_id = $1
AND todo.title_table_id = $2;`;
  pool.query(queryText, [id, title_table_id]).then(result => {

    res.status(200).send(result.rows); // send the status and the response
  }).catch((err) => {
    console.log('there was an error getting the resource', err) // log error
    res.sendStatus(500); // send status
  })
})


// get to grab titles
router.get('/titles', async (req, res) => {
  try {
    const user_id = req.user.id;
    // create query text
    const queryText = `SELECT * FROM "title_table" WHERE user_id = $1;`;
    // send back response
    const response = await pool.query(queryText, [user_id]);
    res.status(200).send(response.rows) // send the response
  } catch (error) {
    console.log('error getting the titles', error) // log error
    res.sendStatus(500); // send status
  }
})

router.post('/title', rejectUnauthenticated, async (req, res) => {
  try {
    // get user 
    const user_id = req.user.id;
    // grab title
    const title = req.body.title;
    // make query
    const queryText = `INSERT INTO "title_table" ("title", "user_id") VALUES ($1, $2);`;
    // make response to send back
    const response = await pool.query(queryText, [title, user_id]);
    res.status(201).send(response.rows) // send response rows and a status of created
  } catch (error) {
    console.log('there was an error posting a title', error) // log the error
    res.sendStatus(500); // send the status
  }
})

module.exports = router;