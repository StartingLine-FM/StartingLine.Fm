import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Paper, Grid, Typography } from '@mui/material';
import algoliasearch from 'algoliasearch/lite';  // Import algoliasearch

// CUSTOM COMPONENTS
import SearchFilter from './SearchFilter';
import Result from './Result';
import { InstantSearch, Hits } from 'react-instantsearch';

// Algolia Initiation and index
const searchClient = algoliasearch('KK1UO0W0NW', 'acfecaf8e37908662d286dc1210b781b');
const index = searchClient.initIndex('test_resources_2');

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

  //Trigger a search for all resources when the page loads
  // useEffect(() => {
  //   handleSearch(''); // Passing an empty query to fetch all resources
  // }, []);


  // Algolia Search Function
  const handleSearch = async (query) => {
    try {
      if (query.length > 0) {
        const { hits } = await index.search(query);
        setSearchResults(hits);
        console.log('searchResults are:', searchResults)
        console.log('hits are:', hits)
      } else {
        // If the query is empty, return all resources
        const { hits } = await index.search('');
        setSearchResults(hits);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  console.log('searchResults are:', searchResults)


  // Redux
  const dispatch = useDispatch();
  const categories = useSelector(store => store.categories);
  const stages = useSelector(store => store.stages);
  const todo = useSelector(store => store.todoListResourcesReducer);
  const lists = useSelector(store => store.tableListReducer);
  const user = useSelector(store => store.user);

  // fetches default search as well as all categories and stages on page load
  useEffect(() => {
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
        <InstantSearch searchClient={searchClient} indexName="test_resources_2">
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
              <Result />
        </Grid>
        </InstantSearch>
      </Grid>
    </Container>
  );
}

export default LandingPage;