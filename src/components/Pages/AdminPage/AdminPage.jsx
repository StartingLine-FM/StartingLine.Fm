import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Box, IconButton, Paper, Typography, Tooltip, Container, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete'; //Added DeleteIcon, delete option
import EditIcon from '@mui/icons-material/Edit'; //Added EditIcon, update option
import SaveIcon from '@mui/icons-material/Save'; // Added SaveIcon, save option
import CancelIcon from '@mui/icons-material/Cancel'; // Added CancelIcon, cancel option
import InfoIcon from '@mui/icons-material/Info'; //Added InfoIcon, info on how things work
import "./AdminPage.css"
import ResourceForm from './ResourceForm';

// AdminPage is a functional component where Admin can add, edit or delete resources, organizations, and stages
function AdminPage() {

  // State variables for new organization and stage name, 
  // and edited organization and stage name
  const [newOrganization, setNewOrganization] = useState('');
  const [newStage, setNewStage] = useState('');
  const [newEntrepreneur, setNewEntrepreneur] = useState('')
  const [newSupport, setNewSupport] = useState('');
  const [newFunding, setNewFunding] = useState('');
  const [editedOrganizationName, setEditedOrganizationName] = useState('');
  const [editedStageName, setEditedStageName] = useState('');
  const [editedEntrepreneur, setEditedEntrepreneur] = useState('');
  const [editedSupport, setEditedSupport] = useState('');
  const [editedFunding, setEditedFunding] = useState('');

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
    dispatch({ type: 'FETCH_ORGANIZATIONS' });
    dispatch({ type: 'FETCH_STAGES' });
    dispatch({ type: 'FETCH_ENTREPRENEUR' });
    dispatch({ type: 'FETCH_SUPPORT' });
    dispatch({ type: 'FETCH_FUNDING' });
  }, [dispatch]);


  // Function to handle adding a new organization
  const handleAddOrganization = (event) => {
    event.preventDefault();
    // If newOrganizationfield is not empty, dispatch action to save new organization
    if (newOrganization !== '') {
      dispatch({ type: 'POST_ORGANIZATION', payload: { name: newOrganization } });
      // Reset newOrganization state
      setNewOrganization('');
    } else {
      alert('Please enter a non-empty organization name.');
    }
  };

  // Function to handle editing a organization
  const handleEditOrganization = (organizationId, currentName) => {
    setEditedOrganizationName({ id: organizationId, name: currentName });
  };

  // Function to save the edited organization name
  const handleSaveEditedOrganization = (organizationId) => {
    // Call the API to update the organization name in the backend
    dispatch({ type: 'UPDATE_ORGANIZATION', payload: { id: organizationId, name: editedOrganizationName.name } });
    setEditedOrganizationName(''); // Reset the edited organization name state after saving changes
    dispatch({ type: 'FETCH_ORGANIZATIONS' }); // Refetch the organizations
  };

  // Function to cancel the organization editing process
  const handleCancelEditOrganization = () => {
    // This function resets the state variable "editedOrganizationName" to an empty string
    setEditedOrganizationName('');
  };

  // Function for deleting a organization
  const handleDeleteOrganization = (organizationId) => {
    // This function uses the window.confirm method to make sure the user truly wants to delete the organization
    if (window.confirm('Are you sure you want to delete this organization?')) {
      // If the user confirms the deletion, it dispatches a Redux action of type 'DELETE_organization' 
      // with the id of the organization to be deleted as the payload
      dispatch({ type: 'DELETE_ORGANIZATION', payload: organizationId });
    }
  };

  const handleAddStage = (event) => {
    // This function prevents the default form submission event
    event.preventDefault();
    // Checks if the new stage name is not an empty string before dispatching the action to add the new stage
    if (newStage !== '') {
      // Dispatches a Redux action of type 'POST_STAGE' with the new stage name as the payload
      dispatch({ type: 'POST_STAGE', payload: { name: newStage } });
      // Resets the new stage name state variable to an empty string
      setNewStage('');
    } else {
      // If the new stage name is an empty string, an alert message is shown asking the user to enter a non-empty stage name
      alert('Please enter a non-empty stage name.');
    }
  };

  // Function to initiate the editing process of a stage
  const handleEditStage = (stageId, currentName) => {
    // Sets the state variable 'editedStageName' to the current stage name that is to be edited
    setEditedStageName({ id: stageId, name: currentName });
    // Refetches the stages data
    dispatch({ type: 'FETCH_STAGES' });
  };

  // Function to save the changes made to the stage name
  const handleSaveEditedStage = (stageId) => {
    // Dispatches a Redux action of type 'UPDATE_STAGE' with the new stage name and its id as the payload
    dispatch({ type: 'UPDATE_STAGE', payload: { id: stageId, name: editedStageName.name } });
    // Resets the 'editedStageName' state variable to an empty string after the stage name has been updated
    setEditedStageName('');
    // Refetches the stages data to reflect the changes
    dispatch({ type: 'FETCH_STAGES' });
  };

  // Function to cancel the editing process of a stage
  const handleCancelEditStage = () => {
    // Resets the 'editedStageName' state variable to an empty string to cancel the editing process
    setEditedStageName('');
  };

  const handleDeleteStage = (stageId) => {
    // Asks for the user's confirmation before deleting the stage
    if (window.confirm('Are you sure you want to delete this stage?')) {
      // If the user confirms the deletion, it dispatches a Redux action of type 'DELETE_STAGE' 
      // with the id of the stage to be deleted as the payload
      dispatch({ type: 'DELETE_STAGE', payload: stageId });
    }
  };

  const handleAddEntrepreneur = (event) => {
    // This function prevents the default form submission event
    event.preventDefault();
    // Checks if the new entrepreneur name is not an empty string before dispatching the action to add the new entrepreneur
    if (newEntrepreneur !== '') {
      // Dispatches a Redux action of type 'POST_ENTREPRENEUR' with the new entrepreneur name as the payload
      dispatch({ type: 'POST_ENTREPRENEUR', payload: { name: newEntrepreneur } });
      // Resets the new entrepreneur name state variable to an empty string
      setNewEntrepreneur('');
    } else {
      // If the new entrepreneur name is an empty string, an alert message is shown asking the user to enter a non-empty entrepreneur name
      alert('Please enter a non-empty stage name.');
    }
  }

  return (
    <Container>
      <Paper sx={{ mt: 3 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          {/* <Paper style={{ display: 'inline-block', padding: '10px' }}> */}
          <Typography variant="h4" component="h4" sx={{ color: '#55c6f0', paddingTop: 3 }}>
            Admin
          </Typography>
          {/* </Paper> */}
        </div>
        <Grid container justifyContent='center' spacing={3}>
          <ResourceForm organizations={organizations} stages={stages} entrepreneur={entrepreneur} funding={funding} support={support} />
          <Grid item xs={4}>
            {/* Form to add a new organization */}
            <Paper style={{ marginBottom: '50px', flexGrow: 1, flexBasis: '0' }} className="admin-container">
              <Typography variant="h6" component="h6" style={{ marginBottom: '20px', textAlign: 'center', color: '#55c6f0' }}>
                Organizations
                {/* Tooltip providing more context on what "organizations" mean */}
                <Tooltip title="These are broad sectors that classify resources based on the source or nature of the assistance. Organizations include government bodies, financial contributors, academic institutions, general support services, service providers, large corporations, and research entities. Please fill in all required fields and click submit.">
                  <InfoIcon style={{ marginLeft: '10px' }} color="action" />
                </Tooltip>

              </Typography>
              {/* Display existing organizations */}
              <div style={{ width: '100%' }}>
                <ul className="admin-list" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                  {/* Mapping over the organizations state and rendering each organization */}
                  {organizations.map((organization) => (
                    <li key={organization.id}>
                      {/* Check if current organization is in edit mode */}
                      {editedOrganizationName && organization.id === editedOrganizationName.id ? (
                        // Show the input field for editing the organization name
                        <TextField
                          value={editedOrganizationName.name}
                          onChange={(event) =>
                            setEditedOrganizationName({ ...editedOrganizationName, name: event.target.value })
                          }
                        />
                      ) : (
                        // Display the organization name
                        <span>{organization.name}</span>
                      )}

                      <div>
                        {editedOrganizationName && organization.id === editedrganizationName.id ? (
                          <>
                            <IconButton
                              color="primary"
                              aria-label="Save organization"
                              onClick={() => handleSaveEditedOrganization(organization.id)}
                            >
                              <SaveIcon />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              aria-label="Cancel edit organization"
                              onClick={handleCancelEditOrganization}
                            >
                              <CancelIcon />
                            </IconButton>
                          </>
                        ) : (
                          <IconButton
                            color="primary"
                            aria-label="Edit organization"
                            onClick={() => handleEditOrganization(organization.id, organization.name)}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                        <IconButton
                          color="secondary"
                          aria-label="Delete organization"
                          onClick={() => handleDeleteOrganization(organization.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </li>
                  ))}
                </ul>
                <form className="admin-form" onSubmit={handleAddOrganization}>
                  <TextField
                    label="New organization"
                    value={newOrganization}
                    onChange={(event) => setNewOrganization(event.target.value)}
                  />
                  {/* Button for submitting the new organization form */}
                  <Button sx={{ mt: 1 }} variant="contained" color="primary" type="submit">
                    Add Organization
                  </Button>
                </form>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            {/* Form to add a new stage */}
            <Paper style={{ marginBottom: '50px', flexGrow: 1, flexBasis: '0' }} className="admin-container">
              <Typography variant="h6" component="h6" style={{ marginBottom: '20px', textAlign: 'center', color: '#55c6f0' }}>
                Stages
                {/* Tooltip providing more context on what "Stages" mean */}
                <Tooltip title="These signify the different phases in a business's life cycle. They range from the nascent or concept phase, through early development, startup or seed stage, and to the growth and expansion phase. Resources are categorized to match the relevant needs at each business stage. Please fill in all required fields and click submit.">
                  <InfoIcon style={{ marginLeft: '10px' }} color="action" />
                </Tooltip>
              </Typography>
              {/* Display existing stages */}
              <div style={{ width: '100%' }}>
                <ul className="admin-list" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                  {stages.map((stage) => (
                    <li key={stage.id}>
                      {/* Check if current stage is in edit mode */}
                      {editedStageName && stage.id === editedStageName.id ? (
                        // Show the input field for editing the stage name
                        <TextField
                          value={editedStageName.name}
                          onChange={(event) =>
                            setEditedStageName({ ...editedStageName, name: event.target.value })
                          }
                        />
                      ) : (
                        // Display the stage name
                        <span>{stage.name}</span>
                      )}

                      <div>
                        {editedStageName && stage.id === editedStageName.id ? (
                          <>
                            <IconButton
                              color="primary"
                              aria-label="Save stage"
                              onClick={() => handleSaveEditedStage(stage.id)}
                            >
                              <SaveIcon />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              aria-label="Cancel edit stage"
                              onClick={handleCancelEditStage}
                            >
                              <CancelIcon />
                            </IconButton>
                          </>
                        ) : (
                          <IconButton
                            color="primary"
                            aria-label="Edit stage"
                            onClick={() => handleEditStage(stage.id, stage.name)}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                        <IconButton
                          color="secondary"
                          aria-label="Delete stage"
                          onClick={() => handleDeleteStage(stage.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </li>
                  ))}
                </ul>
                <form className="admin-form" onSubmit={handleAddStage}>
                  <TextField
                    label="New Stage"
                    value={newStage}
                    onChange={(event) => setNewStage(event.target.value)}
                  />
                  {/* Button for submitting the new stage form */}
                  <Button sx={{ mt: 1 }} variant="contained" color="primary" type="submit">
                    Add Stage
                  </Button>
                </form>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <Typography variant="h6" component="h6" style={{ marginBottom: '20px', textAlign: 'center', color: '#55c6f0' }}>
                Entrepreneur Types
              </Typography>
              {/* Display existing stages */}
              <div style={{ width: '100%' }}>
                <ul className="admin-list" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                  {entrepreneur.map((e) => (
                    <li key={e.id}>
                      {/* Check if current stage is in edit mode */}
                      {editedEntrepreneur && e.id === editedEntrepreneur.id ? (
                        // Show the input field for editing the stage name
                        <TextField
                          value={editedEntrepreneur.title}
                          onChange={(event) =>
                            setEditedEntrepreneur({ ...editedEntrepreneur, title: event.target.value })
                          }
                        />
                      ) : (
                        // Display the stage name
                        <span>{e.title}</span>
                      )}

                      <div>
                        {editedEntrepreneur && e.id === editedEntrepreneur.id ? (
                          <>
                            <IconButton
                              color="primary"
                              aria-label="Save entrepreneur"
                              onClick={() => handleSaveEditedStage(e.id)}
                            >
                              <SaveIcon />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              aria-label="Cancel edit stage"
                              onClick={handleCancelEditStage}
                            >
                              <CancelIcon />
                            </IconButton>
                          </>
                        ) : (
                          <IconButton
                            color="primary"
                            aria-label="Edit entrepreneur"
                            onClick={() => handleEditStage(e.id, e.name)}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                        <IconButton
                          color="secondary"
                          aria-label="Delete entrepreneur"
                          onClick={() => handleDeleteStage(e.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </li>
                  ))}
                </ul>
                <form className="admin-form" onSubmit={handleAddStage}>
                  <TextField
                    label="New Entrepeneur Type"
                    value={newEntrepreneur}
                    onChange={(event) => setNewEntrepreneur(event.target.value)}
                  />
                  {/* Button for submitting the new stage form */}
                  <Button sx={{ mt: 1 }} variant="contained" color="primary" type="submit">
                    Add Entrepreneur Type
                  </Button>
                </form>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>

            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>

            </Paper>
          </Grid>
        </Grid >
      </Paper >
    </Container >
  );
}

export default AdminPage;