import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// MUI
import { Container, Paper, Grid, Typography } from '@mui/material';

// CUSTOM COMPONENTS
import SearchFilter from './SearchFilter';
import Result from './Result';

function LandingPage() {
  const dispatch = useDispatch();
  const search = useSelector(store => store.search);
  const categories = useSelector(store => store.categories);
  const stages = useSelector(store => store.stages);
  const lists = useSelector(store => store.tableListReducer);
  const user = useSelector(store => store.user);

  const [currentList, setCurrentList] = useState(69);

  useEffect(() => {
    dispatch({ type: 'FETCH_SEARCH' })
    dispatch({ type: 'FETCH_CATEGORIES' });
    dispatch({ type: 'FETCH_STAGES' });
  }, [dispatch]);


  return (
    <Container maxWidth="xl" sx={{ p: 3, flexDirection: "row" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SearchFilter currentList={currentList} setCurrentList={setCurrentList} categories={categories} stages={stages} />
        <div style={{ flex: 1 }}>
          <Grid container spacing={3} rowSpacing={3}>
            {/* maps over store.search to return result cards */}
            {search.length > 0
              ? search.map(result => {
                return (
                  <Grid item xs={4} key={result.id}>
                    <Result result={result} currentList={currentList} categories={categories} stages={stages} />
                  </Grid>
                )
              })
              :
              <Typography>Your search returned 0 results.</Typography>
            }
          </Grid>
        </div>
      </div>
    </Container>
  );
}

export default LandingPage;
