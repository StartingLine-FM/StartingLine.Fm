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
  const todo = useSelector(store => store.todoListResourcesReducer);
  const lists = useSelector(store => store.tableListReducer);
  const user = useSelector(store => store.user);

  const [currentList, setCurrentList] = useState(null);

  useEffect(() => {
    dispatch({ type: 'FETCH_SEARCH' });
    dispatch({ type: 'FETCH_CATEGORIES' });
    dispatch({ type: 'FETCH_STAGES' });
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: 'FETCH_TABLE_LISTS' });
  }, [user.id])

  useEffect(() => {
    if (lists.length === 1) {
      setCurrentList(lists[0].id);
      dispatch({ type: 'FETCH_TODO_LIST_RESOURCES', payload: { title_table_id: lists[0].id } })
    }
  }, [lists])

  return (
    <Container maxWidth="xl" spacing={2} sx={{ p: 3, flexDirection: "row" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SearchFilter currentList={currentList} setCurrentList={setCurrentList} categories={categories} stages={stages} todo={todo} />
        <div style={{ flex: 1 }}>
          <Grid container spacing={2} rowSpacing={2}>
            {/* maps over store.search to return result cards */}
            {search.length > 0
              ? search.map(result => {
                return (
                  <Grid item xs={4} key={result.id}>
                    <Result result={result} currentList={currentList} setCurrentList={setCurrentList} categories={categories} stages={stages} />
                  </Grid>
                )
              })
              :
              <Grid item xs={12}>
                <Paper sx={{p:3}}>
                  <Typography>Your search returned 0 results.</Typography>
                </Paper>
              </Grid>
            }
          </Grid>
        </div>
      </div>
    </Container>
  );
}

export default LandingPage;
