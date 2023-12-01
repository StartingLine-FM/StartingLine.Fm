CREATE TABLE "stage" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(25) NOT NULL
);

INSERT INTO "stage" ("name")
VALUES ('All'), ('Ideation'), ('Start Up'), ('Growth'), ('Exit');


CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(40) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "admin" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "organization" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(75) 
);

INSERT INTO "organization" ("name")
VALUES ('Government'),('University'),('NonProfit'),('Private');

CREATE TABLE "entrepreneur" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES "user" ("id"),
	"title" VARCHAR(1000),
	"description" VARCHAR(5000)
);

INSERT INTO "entrepreneur" ("title")
VALUES ('Academic'),('Female'),('Indigenous'),('New American'),('Student'),('Veteran');

CREATE TABLE "funding" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR(1000) NOT NULL,
	"description" VARCHAR(5000)
);

INSERT INTO "funding" ("title")
VALUES ('all'),('loan'),('equity'),('grant');

CREATE TABLE "support" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR(1000) NOT NULL,
	"description" VARCHAR(5000)
);

INSERT INTO "support" ("title")
VALUES ('Planning'),('Networking'),('Training'),('Research'),('Ideation'),('Space');


CREATE TABLE "resource" (
    "id" SERIAL PRIMARY KEY,
    "stage_id" INTEGER REFERENCES "stage" ("id"),
    "organization_id" INTEGER REFERENCES "organization" ("id"),
    "entrepreneur_id" INTEGER REFERENCES "entrepreneur"("id"),
    "name" VARCHAR(250) NOT NULL,
    "image_url" VARCHAR(300),
    "description" VARCHAR(1000),
    "website" VARCHAR(500),
    "email" VARCHAR(500),
    "address" VARCHAR(500),
    "linkedin" VARCHAR(500)
);

CREATE TABLE "title_table" (
	"id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user" ("id"),
	"title" VARCHAR(100)
);

CREATE TABLE "todo" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user" ("id"),
    "resource_id" INTEGER REFERENCES "resource" ("id"),
    "title_table_id" INTEGER REFERENCES "title_table" ("id"),
    "notes" VARCHAR(1000),
    "completed" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "article" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR(1000) NOT NULL,
	"author" VARCHAR(1000) NOT NULL,
	"body" VARCHAR(8000) NOT NULL,
	"image_url" VARCHAR(1000)
);

CREATE TABLE "calendar" (
    "id" SERIAL PRIMARY KEY,
    "source" varchar(1000) NOT NULL,
	"title" varchar(1000) NOT NULL,
	"start" varchar(1000) NOT NULL,
	"end" varchar(1000),
	"description" varchar(1000),
	"location" varchar(8000),
	"expiration" varchar(1000)
);

ALTER TABLE "calendar"
ADD CONSTRAINT unique_event
UNIQUE ("source", "title", "start");

ALTER TABLE "calendar"
ALTER COLUMN "expiration" TYPE TIMESTAMP WITH TIME ZONE USING expiration::timestamp with time zone;

CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE "funding_join" (
	"id" SERIAL PRIMARY KEY,
	"funding_id" INTEGER REFERENCES "funding" ("id"),
	"resource_id" INTEGER REFERENCES "resource" ("id"),
	"article_id" INTEGER REFERENCES "article" ("id")
);

CREATE TABLE "support_join" (
	"id" SERIAL PRIMARY KEY,
	"support_id" INTEGER REFERENCES "support" ("id"),
	"resource_id" INTEGER REFERENCES "resource" ("id"),
	"article_id" INTEGER REFERENCES "article" ("id")
);

-- After executing these CREATE and INSERT statements in order,
-- import the 'FM Reasearch.csv' into your Postico (File > Import CSV)
-- and select the following columns as drop-downs: 
-- Organization - name
-- category_id - category_id
-- Specifics about resources they require - description
-- stage_id - stage_id

UPDATE "resource"
SET
    "image_url" = 'https://connect.bnd.nd.gov/media/images/branding/bnd/logo-color.png',
    "website" = 'https://bnd.nd.gov/',
    "address" = '1200 Memorial Hwy PO Box 5509 Bismarck, ND 58506-5509',
    "linkedin" = 'https://www.linkedin.com/company/bankofnorthdakota/'
WHERE
    "name" = 'Bank of North Dakota';
    
    UPDATE "resource"
SET
    "image_url" = 'https://images.squarespace-cdn.com/content/v1/600c95e66c455e4aedfa38fd/1611437825084-4OG438CISGI0ICSVMQ76/Arthur-Ventures-Logo-400.png',
    "website" = 'https://www.arthurventures.com/home',
    "address" = '80 S 8th St, Suite 3710, Minneapolis, MN 55402/210 Broadway N #301, Fargo, ND 58102',
    "linkedin" = 'https://www.linkedin.com/company/arthur-ventures/'
WHERE
    "name" = 'Arthur Ventures';
    
    UPDATE "resource"
SET
    "image_url" = 'https://pbs.twimg.com/profile_images/2763990190/8e186a8df4331c7a0a545483398aed0b_400x400.jpeg',
    "website" = 'https://ndsuresearchpark.com/',
    "address" = 'NDSU Research & Technology Park 1854 NDSU Research Circle North Fargo, ND 58102',
    "linkedin" = 'https://www.linkedin.com/company/ndsu-research-&-technology-park/'
WHERE
    "name" = 'NDSU Research and Technology Park';
    
    UPDATE "resource"
SET
    "image_url" = 'https://www.dakotabusinesslending.com/wp-content/uploads/2022/02/ND-SBDC.png',
    "email" = 'leadcenter@ndsbdc.org',
    "website" = 'https://ndsbdc.org/',
    "address" = 'Nistler Hall 322 3125 University Avenue Stop 7308 Grand Forks, ND 58202-7308',
    "linkedin" = 'https://www.linkedin.com/company/nd-small-business-development-centers/'
WHERE
    "name" = 'North Dakota Small Business Development Center';
    
    UPDATE "resource"
SET
    "image_url" = 'https://www.commerce.nd.gov/sites/www/files/documents/ED%26F/NDDF/DevelopmentFund%20orange%20173C%20%26%20BLK%20(2).png',
    "website" = 'https://www.commerce.nd.gov/economic-development-finance/development-fund',
    "address" = '1600 E. Century Ave., Suite 6, Bismarck, ND 58503',
    "linkedin" = 'https://www.linkedin.com/company/commercend/'
WHERE
    "name" = 'North Dakota Development Fund';
    
    UPDATE "resource"
SET
    "image_url" = 'https://www.dakotabusinesslending.com/wp-content/uploads/2022/11/Dakota_Horizontal_2color-2.png',
    "website" = 'https://www.dakotabusinesslending.com/',
    "email" = 'info@dakotabusinesslending.com',
    "address" = '5630 36th Ave S, Fargo, ND 58104',
    "linkedin" = 'https://www.linkedin.com/company/dakota-business-lending/'
WHERE
    "name" = 'Dakota Business Lending';
    
    UPDATE "resource"
SET
    "image_url" = 'https://images.squarespace-cdn.com/content/v1/60e4724ea746166606f95abb/fc0cc994-2d1f-4c54-ba4d-c59a165e151b/gBETA+Fargo+Program+Card+v2.png?format=1000w',
    "website" = 'https://www.gener8tor.com/gbeta/fargo',
    "email" = 'sarah.louise@gener8tor.com',
    "linkedin" = 'https://www.linkedin.com/company/gener8tor/'
WHERE
    "name" = 'gBeta Fargo';
    
UPDATE "resource"
SET
    "image_url" = 'https://www.emergingprairie.com/wp-content/uploads/Header_logo-1.png',
    "website" = 'https://www.emergingprairie.com/',
    "email" = 'info@emergingprairie.com',
    "address" = '118 Broadway N, Suite S1 Fargo, ND 58102',
    "linkedin" = 'https://www.linkedin.com/company/emergingprairie/'
WHERE
    "name" = 'Emerging Praire';
    
    UPDATE "resource"
SET
    "image_url" = 'https://downtownfargo.com/wp-content/uploads/2019/07/Snip20190708_4-632x480.png',
    "website" = 'https://folkways.org/',
    "address" = '210 Broadway North, Fargo, ND 58102',
    "linkedin" = 'https://www.linkedin.com/company/folkwaysco/'
WHERE
    "name" = 'Folkways'; 
    
    UPDATE "resource"
SET
    "image_url" = 'https://www.emergingprairie.com/wp-content/uploads/kilbourne-logo.png',
    "website" = 'https://kilbournegroup.com/',
    "address" = '210 Broadway, Suite 300 Fargo, ND 58102',
    "linkedin" = 'https://www.linkedin.com/company/kilbourne-group-llc/'
WHERE
    "name" = 'Kilbourne Group';
    
    UPDATE "resource"
SET
    "image_url" = 'https://bismaninc.com/wp-content/uploads/2022/11/NDWBClogo-Color.png',
    "website" = 'https://www.ndwbc.com/',
    "email" = 'info@ctbnd.com',
    "address" = '3550 38th Ave S, Ste G Fargo, ND 58104',
    "linkedin" = 'https://www.linkedin.com/company/north-dakota-women-s-business-center/'
WHERE
    "name" = North Dakota Women's Business Center';
    
    UPDATE "resource"
SET
    "image_url" = 'https://pbs.twimg.com/profile_images/1227346191626702850/8Pqr4f_A_400x400.jpg',
    "website" = 'https://www.fmwfchamber.com/',
    "email" = 'info@fmwfchamber.com',
    "address" = '3312 42nd St. S, Suite 101 Fargo, ND 58104',
    "linkedin" = 'https://www.linkedin.com/company/fargo-moorhead-west-fargo-chamber-of-commerce/'
WHERE
    "name" = 'F-M Chamber of Commerce';
    
   UPDATE "resource"
SET
    "image_url" = 'https://downtownfargo.com/wp-content/uploads/2019/02/GFMEDC_Ver_RGB-e1558441033531.jpg',
    "description" = 'Cultivate an economic environment where all people and organizations flourish',
    "website" = 'https://gfmedc.com/',
    "address" = '51 Broadway North, Suite 500, Fargo, ND 58102',
    "linkedin" = 'https://www.linkedin.com/company/greater-fargo-moorhead-economic-development-corporation/?viewAsMember=true'
WHERE
    "name" = 'F-M Economic Development Corporation';
    
    UPDATE "resource"
SET
    "image_url" = 'https://cdn.forumcomm.com/dims4/default/5d11796/2147483647/strip/true/crop/774x516+56+0/resize/840x560!/quality/90/?url=https%3A%2F%2Fforum-communications-production-web.s3.us-west-2.amazonaws.com%2Fbrightspot%2Faa%2F2b%2Fc50d3adc44258b585acb7ffff532%2Fscore-logo.png',
    "website" = 'https://www.score.org/',
    "email" = 'contactus@score.org',
    "address" = '1854 NDSU Research Cir N Suite 15, Fargo, ND 58102',
    "linkedin" = 'https://www.linkedin.com/company/score-mentors-prairie-and-lakes/'
WHERE
    "name" = 'SCORE';
    
    UPDATE "resource"
SET
    "image_url" = 'https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen.jpg',
    "website" = 'https://www.microsoft.com/en-us/industry',
    "address" = '3900 Great Plains Dr, Fargo, ND 58104',
    "linkedin" = 'https://www.linkedin.com/company/microsoft/'
WHERE
    "name" = 'Microsoft';
    
    UPDATE "resource"
SET
    "image_url" = 'https://www.sba.gov/themes/custom/sba/src/img/social/SBASEOImage.jpg',
    "website" = 'https://www.sba.gov/district/north-dakota',
    "address" = '657 2nd Ave. N. Room 360, Fargo, ND 58108',
    "linkedin" = 'https://www.linkedin.com/company/us-small-business-administration/'
WHERE
    "name" = 'Small Business Administration';
    
    UPDATE "resource"
SET
    "image_url" = 'https://grandfarm.com/wp-content/uploads/2022/05/Grand-Farm_Logo_Vertical_Color-01.png',
    "website" = 'https://grandfarm.com/',
    "email" = 'info@grandfarm.com',
    "address" = '118 Broadway N, Suite S1, Fargo, ND 58102',
    "linkedin" = 'https://www.linkedin.com/company/grand-farm/'
WHERE
    "name" = 'Grand Farm';
    
    UPDATE "resource"
SET
    "image_url" = 'https://und.edu/innovation/_files/images/cfi-und-full-logo-rgb.png',
    "website" = 'https://und.edu/innovation/',
    "email" = 'info@innovators.net',
    "address" = 'Ina Mae Rude Entrepreneur Center 4200 James Ray Dr, Stop 8372. Grand Forks, ND 58202-8372',
    "linkedin" = 'https://www.linkedin.com/school/uofnorthdakota/'
WHERE
    "name" = 'UND-Center for Innovation';
    
    UPDATE "resource"
SET
    "image_url" = 'https://i.ytimg.com/vi/OdEsuarxR00/maxresdefault.jpg',
    "website" = 'https://www.dakotaventuregroup.com/',
    "email" = 'info@dakotaventuregroup.com',
    "address" = 'Ina Mae Rude Entrepreneur Center 4200 James Ray Drive. Grand Forks, ND 58203',
    "linkedin" = 'https://www.linkedin.com/company/dakota-venture-group/'
WHERE
    "name" = 'UND-Dakota Venture Group';
    
    UPDATE "resource"
SET
    "image_url" = 'https://www.commerce.nd.gov/sites/www/files/documents/Logos/Commerce%20orange%20173C%20%26%20BLK.png',
    "website" = 'https://www.commerce.nd.gov/',
    "address" = '1600 E. Century Ave., Suite 6 Bismarck, ND 58503',
    "linkedin" = 'https://www.linkedin.com/company/commercend/'
WHERE
    "name" = 'North Dakota Department of Commerce';
    
    UPDATE "resource"
SET
    "image_url" = 'https://res.cloudinary.com/simpleview/image/upload/c_fit,w_800,h_600/crm/fargo-moorhead/Concordia-logo-d189d94b5056b36_d189dbb1-5056-b365-ab1183ec0f4d00e2.jpg',
    "website" = 'https://www.concordiacollege.edu/academics/programs-of-study/offutt-school-of-business/',
    "email" = 'charmon1@cord.edu',
    "address" = '901 8th St. S. Moorhead, MN 56562',
    "linkedin" = 'https://www.linkedin.com/school/concordia-college/'
WHERE
    "name" = 'Concordia';
    
    UPDATE "resource"
SET
    "image_url" = 'https://media.licdn.com/dms/image/C5622AQGQ4nA0TLBgSQ/feedshare-shrink_800/0/1673395484628?e=1691020800&v=beta&t=9fLAQn1TSJzqZpgtK_OYR-s-Day-L15pEZIcGjHpC3c',
    "website" = 'https://bvecosystem.com/',
    "address" = '19 8th Street South PMB 432 Fargo, ND 58103',
    "linkedin" = 'https://www.linkedin.com/company/bison-venture-ecosystem/'
WHERE
    "name" = 'Bison Venture Program';
    
    UPDATE "resource"
SET
    "image_url" = 'https://media.licdn.com/dms/image/C560BAQEiz9LKF6ICKg/company-logo_200_200/0/1676547844689?e=2147483647&v=beta&t=zuBEs1rEuTkgr2u62_iU5LpfUtPr1hwfDi4D2LgsDQI',
    "website" = 'http://the100.online/',
    "address" = '20 4th St E, West Fargo, ND 58078',
    "linkedin" = 'https://www.linkedin.com/company/theexecutivescluboffm/'
WHERE
    "name" = 'Executives Club';
    
    UPDATE "resource"
SET
    "image_url" = 'https://ndsu-cefb.com/wp-content/uploads/2022/10/NSF-Great-Plains-I-Corps-Hub.png',
    "website" = 'https://ndsu-cefb.com/i-corps/',
    "email" = 'ndsu-entre@ndsu.edu',
    "address" = '811 2nd Avenue, Richard Barry Hall Fargo, ND 58102',
    "linkedin" = 'https://www.linkedin.com/company/center-for-entrepreneurship-and-family-business/'
WHERE
    "name" = 'NDSU- I-Corp';
    
    UPDATE "resource"
SET
    "image_url" = 'https://media.licdn.com/dms/image/C4E0BAQHzPy10oBvsBA/company-logo_200_200/0/1628540452025?e=2147483647&v=beta&t=WhwIvY-w6oY6qg2CwDGF6S_fiS8rn5w6QHW5sFmLQUQ',
    "email" = 'ndsu.businessdev@ndsu.edu', 
    "website" = 'https://www.ndsu.edu/research/',
    "address" = '1735 NDSU Research Park Drive, Fargo, ND 58102',
    "linkedin" = 'https://www.linkedin.com/company/ndsu-office-of-research-and-creative-activity/'
WHERE
    "name" = 'NDSU- Research and Creative Activity Office';
    
    UPDATE "resource"
SET
    "image_url" = 'https://img1.wsimg.com/isteam/stock/97984/:/rs=w:1160,h:732',
    "website" = 'https://www.vcpathway.com/',
    "email" = 'contact@vcpathway.com',
    "linkedin" = 'https://www.linkedin.com/company/pathwayvc/'
WHERE
    "name" = 'NDSU- Pathway Ventures';
    
    UPDATE "resource"
SET
    "image_url" = 'https://www.ndepscor.ndus.edu/fileadmin/templates/ndus-epscor-2019/images/epscor-logo.jpg',
    "website" = 'https://www.ndepscor.ndus.edu/about/',
    "email" = 'ndepscor@ndus.edu',
    "address" = '1805 NDSU Research Park Dr N Fargo, ND 58102',
    "linkedin" = 'https://www.linkedin.com/company/epscorideafoundation/'
WHERE
    "name" = 'NDSU- EPSCOR';

UPDATE "resource"
SET
    "category_id" = 5,
    "stage_id" = 4,
    "image_url" = 'https://images.squarespace-cdn.com/content/v1/60e4724ea746166606f95abb/c65128bd-85c2-4c1e-8cd9-870affa0a148/gener8tor-logo-full.png',
    "description" = 'Venture capital firm and accelerator that brings together startup founders, investors, corporations, job seekers, universities, musicians and artists.',
    "website" = 'https://www.gener8tor.com/',
    "email" = 'info@gener8tor.com',
    "address" = '821 E Washington Avenue Suite 200-G Madison, WI 53703',
    "linkedin" = 'https://www.linkedin.com/company/gener8tor/'
WHERE
    "name" = 'Generator';
    
    UPDATE "resource"
SET
    "category_id" = 2,
    "stage_id" = 1,
    "image_url" = 'https://static.wixstatic.com/media/befb08_ac9fe928a8544394ba9bb7db6aa91ab3~mv2.png/v1/fit/w_2500,h_1330,al_c/befb08_ac9fe928a8544394ba9bb7db6aa91ab3~mv2.png',
    "description" = 'A fund to help serve the growing capital needs for startups within the midwest. Seeks to partner with high-growth opportunities.',
    "website" = 'https://www.701fund.com/',
    "email" = 'contact@701angelfund.com',
    "address" = '4200 James Ray Dr. Grand Forks, ND 58202',
    "linkedin" = 'https://www.linkedin.com/company/701fund/'
WHERE
    "name" = '701 Angel Fund';
    
    UPDATE "resource"
SET
    "category_id" = 2,
    "stage_id" = 3,
    "image_url" = 'https://homegrown.capital/wp-content/themes/homegrowncapital/inc/assets/images/logo-header.svg',
    "description" = 'A venture capital company that invests in early stage technology-driven companies.',
    "website" = 'https://homegrown.capital/',
    "address" = '118 Broadway N Suite 206 Fargo, ND 58102',
    "linkedin" = 'https://www.linkedin.com/company/homegrown-capital/'
WHERE
    "name" = 'Homegrown Capital';
    
    UPDATE "resource"
SET
    "category_id" = 1,
    "stage_id" = 1,
    "image_url" = 'https://www.ndda.nd.gov/sites/www/files/styles/facebook_share/public/documents/theme/Capitol_Social_Share.jpg',
    "description" = 'Creates new wealth and employment opportunities through the development of new and expanded uses of North Dakotas agricultural products via a grant program.',
    "website" = 'https://www.ndda.nd.gov/divisions/business-marketing-information/ag-products-utilization-commission-apuc',
    "email" = 'ndda@nd.gov',
    "address" = '600 E Boulevard Ave Dept 602 Bismarck, ND 58505-0020'
WHERE
    "name" = 'Agricultural Products Utilization Commission';
    
    UPDATE "resource"
SET
    "category_id" = 4,
    "stage_id" = 3,
    "image_url" = 'https://und.edu/dakotasvboc/_files/images/content-images/2022cover2.png',
    "description" = 'A one-stop-shop for service members, veterans, and military spouses looking to start, purchase, or grow a business. Provides business development assistance such as training, advising and mentoring, and resource referrals.',
    "website" = 'https://und.edu/dakotasvboc/',
    "email" = 'dakotas.vboc@und.edu',
    "address" = '4300 James Ray Dr., Grand Forks, ND 58202',
    "linkedin" = 'https://www.linkedin.com/company/us-small-business-administration/'
WHERE
    "name" = 'Veterans Business Outreach Center';
    
    UPDATE "resource"
SET
    "category_id" = 5,
    "stage_id" = 3,
    "image_url" = 'https://chambermaster.blob.core.windows.net/userfiles/UserFiles/chambers/3374/CMS/logo/ChamberLogo_Vertical_color-787.png',
    "description" = 'The Chamber is a catalyst for growth and prosperity. We protect and promote business, inspire individuals, cultivate communities, and influence action.',
    "website" = 'https://www.fmwfchamber.com/',
    "email" = 'info@fmwfchamber.com',
    "address" = '3312 42 St S Ste 101, Fargo, ND 58104',
    "linkedin" = 'https://www.linkedin.com/company/fargo-moorhead-west-fargo-chamber-of-commerce/'
WHERE
    "name" = 'Chamber of Commerce';
    
    UPDATE "resource"
SET
    "category_id" = 2,
    "stage_id" = 1,
    "image_url" = 'https://goldenpath.net/wp-content/uploads/2021/04/Lift-Award.jpg',
    "description" = 'An innovation loan fund that provides support for technology advancement through financing the commercialization of intellectual property.',
    "website" = 'https://www.commerce.nd.gov/economic-development-finance/finance-and-incentives/finance-programs/legacy-investment-technology',
    "address" = '1600 E. Century Ave., Suite 6  Bismarck, ND 58503',
    "linkedin" = 'https://www.linkedin.com/company/commercend/'
WHERE
    "name" = 'LIFT - Innovation Technology Loan Fund';
    
    UPDATE "resource"
SET
    "category_id" = 2,
    "stage_id" = 1,
    "image_url" = 'https://lcdgroup.org/wp-content/uploads/2017/06/LCDGArtboard-1.png',
    "description" = 'An innovative program that leverages private lending financing to help small businesses and manufacturers attain loans and investment to expand and create jobs.',
    "website" = 'https://lcdgroup.org/north-dakota-opportunity-fund/',
    "email" = 'info@lcdgroup.org',
    "address" = '200 1st Avenue NW Suite 100 Mandan, ND 58554'
WHERE
    "name" = 'North Dakota Opportunity Fund';
    
    UPDATE "resource"
SET
    "category_id" = 7,
    "stage_id" = 1,
    "image_url" = 'https://content.govdelivery.com/attachments/fancy_images/USITATRADE/2020/06/3455838/rural-export-center-horizontal_original.png',
    "description" = 'Provides companies in rural America research assistance to help identify buyers and business partners.',
    "website" = 'https://www.trade.gov/rural-export-center',
    "email" = 'rural@trade.gov',
    "address" = '811 2nd Ave N, Fargo, ND 58102',
    "linkedin" = 'https://www.linkedin.com/company/rural-export-center/'
WHERE
    "name" = 'Rural Export Center';
    
    UPDATE "resource"
SET
    "category_id" = 4,
    "stage_id" = 1,
    "image_url" = 'https://downtownfargo.com/wp-content/uploads/2019/02/Screen-Shot-2019-08-08-at-2.21.21-PM.png',
    "description" = 'Connecting people and their life experiences to opportunities to serve and improve the health of others. Provide funding and expertise with a slant towards healthcare.',
    "website" = 'https://dakmed.org/',
    "email" = 'info@dakmed.org',
    "address" = '4141 28th Ave South Fargo, ND 58104',
    "linkedin" = 'https://www.linkedin.com/company/dakota-medical-foundation/'
WHERE
    "name" = 'Dakota Medical Foundation';
    
    UPDATE "resource"
SET
    "category_id" = 4,
    "stage_id" = 1,
    "image_url" = 'https://lotusmidwest.com/wp-content/themes/lotusmidwest/img/lotus-logo-large.png',
    "description" = 'We offer opportunities through our social spaces, retreats, and other events for Midwestern women at all levels of their careers to connect and build community with their peers.',
    "website" = 'https://lotusmidwest.com/',
    "address" = '101 10th Street North, Suite 100 Fargo, ND 58102',
    "linkedin" = 'https://www.linkedin.com/company/lotus-voice-midwest/'
WHERE
    "name" = 'Lady Boss';
    
    UPDATE "resource"
SET
    "category_id" = 3,
    "stage_id" = 1,
    "image_url" = 'https://img1.wsimg.com/isteam/ip/ae9a16d4-9820-45ab-8840-aa0c9bb1b5a6/combined%20logos.jpg/:/rs=w:1034,h:150,cg:true,m/cr=w:1034,h:150/qt=q:95',
    "description" = 'Provides no-cost business consulting to help small businesses start, grow and succeed.',
    "website" = 'https://westcentralmnsbdc.com/',
    "address" = '1900 28th Avenue South, Moorhead, Minnesota 56560, United States',
    "linkedin" = 'https://www.linkedin.com/company/west-central-mn-sbdc/'
WHERE
    "name" = 'Moorhead SBDC';
    
UPDATE "resource"
SET
    "category_id" = 2,
    "stage_id" = 4,
    "image_url" = 'https://i.tracxn.com/logo/company/Wunup.._2a20490b-33b3-4a23-8bd0-73bc9bc46704.png?height=120&width=120',
    "description" = 'Compete for cash with fitness challenges',
    "website" = 'https://wunup.app/',
    "email" = 'Blake.richards@wunup.app',
    "linkedin" = 'https://www.linkedin.com/company/wunupapp/about/'
WHERE
    "name" = 'Blake Richards-wunup';
    
    UPDATE "resource"
SET
    "image_url" = 'https://gardnerisp.com/wp-content/uploads/2023/03/image-1-1024x170.png',
    "website" = 'https://www.ndsu.edu/research/',
    "email" = 'cindy.graffeo@ndsu.edu',
    "address" = '1735 NDSU Research Park Drive, Fargo, ND 58102',
    "linkedin" = 'https://www.linkedin.com/company/ndsu-office-of-research-and-creative-activity/'
WHERE
    "name" = 'NDSU-Director for Innovation and Economic Development';
    
UPDATE "resource"
SET
    "description" = 'Experienced sourcing professional',
    "email" = 'zachwillis57@gmail.com',
    "linkedin" = 'https://www.linkedin.com/in/zachary-willis-300a5665/',
    "stage_id" = 1,
    "category_id" = 5
WHERE
    "name" = 'Zach willis';