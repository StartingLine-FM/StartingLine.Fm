

function filterSearchThroughCategory(searchParam) {
    // create query text variable to change in logic
    let queryText = '';
    // logic for filtering through searches based on category
    if(searchParam === 'Government') {
        queryText = '"category_id" = 1'
    } else if(searchParam === 'Funding Organization') {
         queryText = '"category_id" = 2'
    } else if(searchParam === 'University') {
         queryText = '"category_id" = 3'
    } else if(searchParam === 'Support Organization') {
         queryText = '"category_id" = 4'
    }  else if(searchParam === 'Service Provider') {
         queryText = '"category_id" = 5'
    }  else if(searchParam === 'Big Company') {
         queryText = '"category_id" = 6'
    } else if(searchParam === 'Research Organization') {
         queryText = '"category_id" = 7'
    }

    // if nothing else return an empty
    return queryText;
}




// export module
module.exports = filterSearchThroughCategory;