const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// Define a route that takes a source query parameter
router.get("/:source", async (req, res) => {
  const { source } = req.params;

  try {
    if (!source) {
      return res.status(400).send({ error: "Source parameter is required." });
    }

    let events = [];

    // Query the database to retrieve events based on the specified source
    if (source === "emerging-prairie") {
      const { rows } = await pool.query(
        `SELECT * FROM "calendar" WHERE "source" = 'ep'`
      );
      events = rows;
    } else if (source === "fargo-underground") {
      const { rows } = await pool.query(
        `SELECT * FROM "calendar" WHERE "source" = 'fu'`
      );
      events = rows;
    } else if (source === "chamber") {
      const { rows } = await pool.query(
        `SELECT * FROM "calendar" WHERE "source" = 'fmwf'`
      );
      events = rows;
    } else if (source === "cefb") {
      const { rows } = await pool.query(
        `SELECT * FROM "calendar" WHERE "source" = 'cefb'`
      );
      events = rows;
    } else {
      return res.status(400).send({ error: "Invalid source parameter." });
    }

    // Create a response object
    const response = events; // directly use the 'events' array as the response


    res.send(response);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send({ error: "An error occurred while fetching events." });
  }
});

module.exports = router;
