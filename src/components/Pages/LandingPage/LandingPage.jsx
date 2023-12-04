import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Paper, Grid, Typography } from '@mui/material';
import algoliasearch from 'algoliasearch/lite';  // Import algoliasearch

// CUSTOM COMPONENTS
import SearchFilter from './SearchFilter';
import Result from './Result';
import ResultsMap from './ResultsMap';
import { InstantSearch, Hits } from 'react-instantsearch';

// Algolia Initiation and index
const searchClient = algoliasearch('KK1UO0W0NW', 'acfecaf8e37908662d286dc1210b781b');
const index = searchClient.initIndex('resource');

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
    dispatch({ type: 'FETCH_ORGANIZATION' });
    dispatch({ type: 'FETCH_STAGE' });
    dispatch({ type: 'FETCH_ENTREPRENEUR' });
    dispatch({ type: 'FETCH_SUPPORT' });
    dispatch({ type: 'FETCH_FUNDING' });
  }, [dispatch]);

  // fetches list of To-Do List titles for a logged-in user
  useEffect(() => {
    if (user.id) { dispatch({ type: 'FETCH_TABLE_LISTS' }); }
  }, [user.id])

  // sets current list as the first item of the lists array if user only has 1 list
  useEffect(() => {
    if (lists.length === 1) {
      let listID = lists[0].id
      setCurrentList(listID);
      dispatch({ type: 'FETCH_TODO_LIST_RESOURCES', payload: listID })
    }
  }, [lists])

  return (
    <Container maxWidth="xl" spacing={1} sx={{ pt: 3 }}>
      <Grid container justifyContent="center" spacing={4}>
        <InstantSearch searchClient={searchClient} indexName="resource">
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
          <Grid item xs={12} md={8} container spacing={4}>
            <ResultsMap currentList={currentList} categories={categories} stage={stages} />
          </Grid>
        </InstantSearch>
      </Grid>
    </Container>
  );
}

export default LandingPage;