

function filterSearchThroughCategory(searchParam) {
    // create query text variable to change in logic
    let queryText = '';
    // logic for filtering through searches based on category
    if(searchParam === 'Government') {
        queryText = 'SELECT * FROM "resource" WHERE "id" = "1";'
    } else if(searchParam === 'Funding Organization') {
         queryText = 'SELECT * FROM "resource" WHERE "id" = "2";'
    } else if(searchParam === 'University') {
         queryText = 'SELECT * FROM "resource" WHERE "id" = "3";'
    } else if(searchParam === 'Support Organization') {
         queryText = 'SELECT * FROM "resource" WHERE "id" = "4";'
    }  else if(searchParam === 'Service Provider') {
         queryText = 'SELECT * FROM "resource" WHERE "id" = "5";'
    }  else if(searchParam === 'Big Company') {
         queryText = 'SELECT * FROM "resource" WHERE "id" = "6";'
    } else if(searchParam === 'Research Organization') {
         queryText = 'SELECT * FROM "resource" WHERE "id" = "7";'
    }

    // if nothing else return an empty
    return queryText;
}




// export module
module.exports = filterSearchThroughCategory