import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Paper, Grid, Typography } from '@mui/material';

// CUSTOM COMPONENTS
import SearchFilter from './SearchFilter';
import Result from './Result';

function LandingPage({ currentList, setCurrentList }) {

  //State variables to be used in Algolia search
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  //Algolia Event Handler
  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  //Algolia Search Function
  const handleSearch = async (query) => {
    if (query.length > 0) {
      try {
        const { hits } = await index.search(query);
        setSearchResults(hits);
        console.log('Search results:', hits); // Add this line to log the search results
      } catch (error) {
        console.error('Error searching:', error);
      }
    } else {
      setSearchResults([]); // Clear the results if the query is empty
    }
  };


  // Redux
  const dispatch = useDispatch();
  const search = useSelector(store => store.search);
  const categories = useSelector(store => store.categories);
  const stages = useSelector(store => store.stages);
  const todo = useSelector(store => store.todoListResourcesReducer);
  const lists = useSelector(store => store.tableListReducer);
  const user = useSelector(store => store.user);

  // fetches default search as well as all categories and stages on page load
  useEffect(() => {
    // dispatch({ type: 'FETCH_SEARCH' });
    dispatch({ type: 'FETCH_CATEGORIES' });
    dispatch({ type: 'FETCH_STAGES' });
  }, [dispatch]);

  // fetches list of To-Do List titles for a logged-in user
  useEffect(() => {
    if (user.id) { dispatch({ type: 'FETCH_TABLE_LISTS' }); }
  }, [user.id])

  // sets current list as the first item of the lists array if user only has 1 list
  useEffect(() => {
    if (lists.length === 1) {
      setCurrentList(lists[0].id);
      dispatch({ type: 'FETCH_TODO_LIST_RESOURCES', payload: { title_table_id: lists[0].id } })
    }
  }, [lists])

  return (
    <Container maxWidth="lg" spacing={1} sx={{ pt: 3 }}>
      <Grid container justifyContent="center" spacing={2}>
        <SearchFilter
          currentList={currentList}
          setCurrentList={setCurrentList}
          categories={categories}
          stages={stages}
          todo={todo}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          handleSearch={() => handleSearch(searchQuery, setSearchResults)}
        />
        <Grid item xs={12} md={8} container spacing={2}>
          {searchResults.length > 0 ? (
            searchResults.map(result => (
              <Grid item xs={12} sm={6} lg={4} key={result.id}>
                <Result
                  result={result}
                  currentList={currentList}
                  setCurrentList={setCurrentList}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography>Your search returned 0 results.</Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default LandingPage;