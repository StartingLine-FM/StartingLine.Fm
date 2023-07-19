import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// MUI
import { Container, Paper, Grid } from '@mui/material';

// CUSTOM COMPONENTS
import SearchFilter from './SearchFilter';

function LandingPage() {

  const dispatch = useDispatch();
  const search = useSelector(store => store.search)

  useEffect(() => {
    dispatch({
      type: "FETCH_SEARCH"
    });
  }, [])

  return (
    <Container>
      <Paper>
        <Grid container>
          <Grid item>
            <SearchFilter />
          </Grid>
        </Grid>
        <Grid container>
          {/* maps over store.search to return result cards
          ex.
          { search.length > 0 &&
            search.map(result => {
              return (
                <Grid item>
                  <Result name={result.name} image={result.image_url} description={result.description} />
                <Grid />
              )
            })}
          */}
          {search.length > 0 &&
            search.map(result => {
              return (
                <Grid item>
                  <p>{result.name} - {result.description}</p>
                  </Grid>
            )})}
        </Grid>
      </Paper>
    </Container>
  )

}

export default LandingPage;
