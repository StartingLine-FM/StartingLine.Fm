const pool = require('./modules/pool');
const algoliasearch = require('algoliasearch');
require('dotenv').config();

// Connect and authenticate with your Algolia app
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);

// Create a new index and add records
const index = client.initIndex('test_resource_3');

// SQL query to retrieve data for indexing
const queryText = `
SELECT
    r."id" AS "objectID",
    r."name",
    r."description",
    r."image_url",
    o."name" AS "organization_name",
    o."id" AS "organization_id",
    s."name" AS "stage_name",
    s."id" AS "stage_id",
    e."title" AS "entrepreneur_title",
    e."id" AS "entrepreneur_id",
    CASE
        WHEN COUNT(sj."support_id") = 0 THEN NULL
        ELSE jsonb_agg(
            DISTINCT jsonb_build_object(
                'support_id', sj."support_id",
                'support_join_id', sj."id",
                'title', su."title"
            )
        )
    END AS "support",
    CASE
        WHEN COUNT(fj."funding_id") = 0 THEN NULL
        ELSE jsonb_agg(
            DISTINCT jsonb_build_object(
                'funding_id', fj."funding_id",
                'funding_join_id', fj."id",
                'title', f."title"
            )
        )
    END AS "funding",
    r."website",
    r."email",
    r."address",
    r."linkedin"
FROM "resource" r
LEFT JOIN "organization" o ON o."id" = r."organization_id"
LEFT JOIN "stage" s ON s."id" = r."stage_id"
LEFT JOIN "entrepreneur" e ON e."id" = r."entrepreneur_id"
LEFT JOIN "support_join" sj ON sj."resource_id" = r."id"
LEFT JOIN "support" su ON su."id" = sj."support_id"
LEFT JOIN "funding_join" fj ON fj."resource_id" = r."id"
LEFT JOIN "funding" f ON f."id" = fj."funding_id"
GROUP BY
    r."id",
    o."name",
    o."id",
    s."name",
    s."id",
    e."title",
    e."id";
`;

pool.query(queryText)
    .then(result => {
        // Save the resources into the Algolia index
        index.saveObjects(result.rows)
            .then(() => console.log('Resources indexed successfully'))
            .catch(error => console.error('Error indexing resources:', error));
    })
    .catch(err => console.error('Error fetching data:', err));
