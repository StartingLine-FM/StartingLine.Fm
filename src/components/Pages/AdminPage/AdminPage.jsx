import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Typography, Container, Grid } from '@mui/material';
import "./AdminPage.css"
import ResourceForm from './ResourceForm';
import TagForm from './TagForm';

// AdminPage is a functional component where Admin can add, edit or delete resources, organizations, and stages
function AdminPage() {

  // useDispatch hook allows us to dispatch a Redux action and history pushes non-admin to home
  const dispatch = useDispatch();
  const history = useHistory();

  // useSelector hook to extract data from the Redux store state
  const user = useSelector((state) => state.user);
  const organizations = useSelector((state) => state.organizations);
  const stages = useSelector((state) => state.stages);
  const entrepreneur = useSelector((state) => state.entrepreneur);
  const support = useSelector((state) => state.support);
  const funding = useSelector((state) => state.funding);

  // Check if the user is not an admin and redirect to the home page
  useEffect(() => {
    if (!user.admin) {
      history.push('/home');
    }
  }, [user.admin, history]);

  // useEffect hook to fetch organizations and stages once the component is mounted
  useEffect(() => {
    // Fetch organizations and stages on component mount
    dispatch({ type: 'FETCH_ORGANIZATION' });
    dispatch({ type: 'FETCH_STAGE' });
    dispatch({ type: 'FETCH_ENTREPRENEUR' });
    dispatch({ type: 'FETCH_SUPPORT' });
    dispatch({ type: 'FETCH_FUNDING' });
  }, [dispatch]);


  return (
    <Container>
      <Typography variant="h4" component="h4" align="center" color="primary" sx={{ paddingTop: 3 }}>
        Admin
      </Typography>
      <Grid container justifyContent='center' alignItems='center' spacing={2}>
        <ResourceForm organizations={organizations} stages={stages} entrepreneur={entrepreneur} funding={funding} support={support} />
        <TagForm tagRedux={stages} tagTitle={'Stage'} size={4} column={'name'} />
        <TagForm tagRedux={support} tagTitle={'Support'} column={'title'} size={4} />
        <TagForm tagRedux={funding} tagTitle={'Funding'} column={'title'} size={4} />
        <TagForm tagRedux={entrepreneur} tagTitle={'Entrepreneur'} column={'title'} size={6} />
        <TagForm tagRedux={organizations} tagTitle={'Organization'} column={'name'} size={6} />
      </Grid >
    </Container >
  );
}

export default AdminPage;