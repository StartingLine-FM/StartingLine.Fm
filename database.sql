CREATE TABLE "stage" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(25) NOT NULL,
    "description" VARCHAR(1000)
);

INSERT INTO "stage" ("name")
VALUES ('All'), ('Nascent'), ('Early Stage'), ('Startup/Seed'), ('Growth');


CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "stage_id" INTEGER REFERENCES "stage" ("id"),
    "username" VARCHAR(40) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "admin" BOOLEAN DEFAULT FALSE,
    "avatar" VARCHAR(500)
);

CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(75) 
);

INSERT INTO "category" ("name")
VALUES ('Government'),('Funding Organization'),('University'),('Support Organization'),('Service Provider'),('Big Company'),('Research Organization');


CREATE TABLE "resource" (
    "id" SERIAL PRIMARY KEY,
    "stage_id" INTEGER REFERENCES "stage" ("id"),
    "category_id" INTEGER REFERENCES "category" ("id"),
    "name" VARCHAR(250) NOT NULL,
    "image_url" VARCHAR(300),
    "description" VARCHAR(1000),
    "website" VARCHAR(500),
    "email" VARCHAR(500),
    "address" VARCHAR(500),
    "linkedin" VARCHAR(500)
);


CREATE TABLE "todo" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user" ("id"),
    "resource_id" INTEGER REFERENCES "resource" ("id"),
    "title" VARCHAR(150) DEFAULT 'To-Do',
    "notes" VARCHAR(1000),
    "completed" BOOLEAN DEFAULT FALSE
);
-- add a title table id to reference the table
ALTER TABLE "todo" ADD "title_table_id" INTEGER REFERENCES "title_table" ("id");

-- create a new table to have all of the titles in it
CREATE TABLE "title_table" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR(100)
);
-- alter the title_table to have a reference to the user id so we can query titles based on user
ALTER TABLE "title_table" ADD "user_id" INTEGER REFERENCES "user" ("id");


CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- After executing these CREATE and INSERT statements in order, import the 'FM Reasearch.csv' 
-- and select the following columns as drop-downs: 
-- Organization - name
-- category_id - category_id
-- Specifics about resources they require - description
-- stage_id - stage_id