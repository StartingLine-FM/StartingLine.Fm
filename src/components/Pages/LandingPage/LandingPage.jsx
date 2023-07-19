import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// MUI
import { Container, Paper, Grid } from '@mui/material';

// CUSTOM COMPONENTS
import SearchFilter from './SearchFilter';
import Result from './Result';

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
                <Grid />
              )
            })}
          */}
          {search.length > 0 &&
            search.map(result => {
              return (
                <Grid item>
                  <Result result={result} />
                  </Grid>
            )})}
        </Grid>
      </Paper>
    </Container>
  )

}

export default LandingPage;
