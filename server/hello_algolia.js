const pool = require('./modules/pool');
const algoliasearch = require('algoliasearch');

// Connect and authenticate with your Algolia app
const client = algoliasearch('KK1UO0W0NW', '2123fc835b2954cd49ef43065ab14ba6');

// Create a new index and add records
const index = client.initIndex('test_resources_2');

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
    support."title" AS "support_title", -- Individual support titles
    funding."title" AS "funding_titles",
    r."website",
    r."email",
    r."address",
    r."linkedin"
  FROM "resource" r
  LEFT JOIN "organization" o ON o."id" = r."organization_id"
  LEFT JOIN "stage" s ON s."id" = r."stage_id"
  LEFT JOIN "entrepreneur" e ON e."id" = r."entrepreneur_id"
  LEFT JOIN "support_join" sj ON r."id" = sj."resource_id"
  LEFT JOIN "support" support ON sj."support_id" = support."id"
  LEFT JOIN "funding_join" fj ON r."id" = fj."resource_id"
  LEFT JOIN "funding" funding ON fj."funding_id" = funding."id"
`;

pool.query(queryText)
  .then(result => {
    // Group support titles into an array of objects for each resource
    const resources = result.rows.reduce((acc, row) => {
      const existingResource = acc.find(r => r.objectID === row.objectID);
      if (existingResource) {
        existingResource.support_titles.push({ title: row.support_title });
      } else {
        acc.push({
          objectID: row.objectID,
          name: row.name,
          description: row.description,
          image_url: row.image_url,
          organization_id: row.organization_id,
          organization_name: row.organization_name,
          stage_name: row.stage_name,
          stage_id: row.stage_id,
          entrepreneur_title: row.entrepreneur_title,
          entrepreneur_id: row.entrepreneur_id,
          support_titles: [{ title: row.support_title }],
          funding_titles: row.funding_titles,
          website: row.website,
          email: row.email,
          address: row.address,
          linkedin: row.linkedin,
        });
      }
      return acc;
    }, []);

    // Save the resources into the Algolia index
    index.saveObjects(resources)
      .then(() => console.log('Resources indexed successfully'))
      .catch(error => console.error('Error indexing resources:', error));
  })
  .catch(err => console.error('Error fetching data:', err));
