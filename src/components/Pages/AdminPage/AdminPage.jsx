import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Box, IconButton, Paper, Typography, Tooltip, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; //Added DeleteIcon, delete option
import EditIcon from '@mui/icons-material/Edit'; //Added EditIcon, update option
import SaveIcon from '@mui/icons-material/Save'; // Added SaveIcon, save option
import CancelIcon from '@mui/icons-material/Cancel'; // Added CancelIcon, cancel option
import InfoIcon from '@mui/icons-material/Info'; //Added InfoIcon, info on how things work
import "./AdminPage.css"

// AdminPage is a functional component where Admin can add, edit or delete resources, organizations, and stages
function AdminPage() {
  // State for new resource input fields using useState hook
  const [newResource, setNewResource] = useState({
    name: '',
    image_url: '',
    description: '',
    website: '',
    email: '',
    address: '',
    linkedin: '',
    organization_id: '',
    stage_id: '',
  });

  // State variables for new organization and stage name, 
  // and edited organization and stage name
  const [newOrganization, setNewOrganization] = useState('');
  const [newStage, setNewStage] = useState('');
  const [editedOrganizationName, setEditedOrganizationName] = useState('');
  const [editedStageName, setEditedStageName] = useState('');


  // useDispatch hook allows us to dispatch a Redux action and history pushes non-admin to home
  const dispatch = useDispatch();
  const history = useHistory();

  // Regular expression for URL validation
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  // useSelector hook to extract data from the Redux store state
  const organizations = useSelector((state) => state.organizations);
  const stages = useSelector((state) => state.stages);
  const user = useSelector((state) => state.user);

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
  }, [dispatch]);


  // handleSubmit is a function that validates newResource input fields and dispatches a new resource
  const handleSubmit = (event) => {
    // prevent default form submission
    event.preventDefault();

    // Validate the LinkedIn URL
    if (newResource.linkedin !== '' && !urlRegex.test(newResource.linkedin)) {
      alert('Invalid LinkedIn URL');
      return;
    }

    // Validate the Website URL
    if (newResource.website !== '' && !urlRegex.test(newResource.website)) {
      alert('Invalid Website URL');
      return;
    }

    // Validate the Image URL
    if (newResource.image_url && !isValidImageUrl(newResource.image_url)) {
      alert('Invalid Image URL');
      return;
    }

    // If all fields are properly filled out, dispatch action to save new resource
    if (newResource.name && newResource.description && newResource.stage_id && newResource.organization_id) {
      dispatch({ type: 'POST_RESOURCE', payload: newResource });
      setNewResource({
        name: '',
        image_url: '',
        description: '',
        website: '',
        email: '',
        address: '',
        linkedin: '',
        organization_id: '',
        stage_id: '',
      });
    } else {
      // Display a validation error message or take appropriate action
      alert('Please provide all mandatory fields (name, description, stage, and organization).');
    }
  };

  const isValidImageUrl = (url) => {
    // A simple check to see if the URL ends with common image file extensions
    // Note: This is not a foolproof check
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };
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

        {/* A Box is used here to create a flex container for the forms */}
        <Box display="flex" flexDirection="row" className='style-box'>
          <Paper style={{ marginBottom: '50px', flexGrow: 1, flexBasis: '0' }} className="admin-container">
            {/* Information about the form is displayed here */}
            <Typography variant="h6" component="h6" style={{ marginBottom: '20px', textAlign: 'center', color: '#55c6f0' }}>
              Contribute Resource
              {/* The Tooltip component is used here to provide additional information about the form */}
              <Tooltip title="This form allows the addition of new resources. Complete all required fields with accurate information. After confirming details, click 'Submit' for user availability.">
                <InfoIcon style={{ marginLeft: '10px' }} color="action" />
              </Tooltip>
            </Typography>

            {/* Form to add a new resource */}
            <form className='admin-form' onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
              <TextField
                label="Name"
                value={newResource.name}
                // Updates the 'name' property of the 'newResource' state when the input value changes
                onChange={(event) => setNewResource({ ...newResource, name: event.target.value })}
                required // This makes the field mandatory
              />
              <TextField
                sx={{ mt: 1 }}
                label="Image URL"
                value={newResource.image_url}
                // Updates the 'image_url' property of the 'newResource' state when the input value changes
                onChange={(event) => setNewResource({ ...newResource, image_url: event.target.value })}
              />
              <TextField
                sx={{ mt: 1 }}
                label="Description"
                value={newResource.description}
                // Updates the 'description' property of the 'newResource' state when the input value changes
                onChange={(event) => setNewResource({ ...newResource, description: event.target.value })}
                required // This makes the field mandatory
              />
              <TextField
                sx={{ mt: 1 }}
                label="LinkedIn"
                value={newResource.linkedin}
                // Updates the 'linkedin' property of the 'newResource' state when the input value changes
                onChange={(event) => setNewResource({ ...newResource, linkedin: event.target.value })}
                // Validate the LinkedIn URL using the regex
                // A valid LinkedIn URL starts with "https://www.linkedin.com/"
                error={!urlRegex.test(newResource.linkedin) && newResource.linkedin !== ''}
                helperText={newResource.linkedin !== '' && !urlRegex.test(newResource.linkedin) ? 'Invalid LinkedIn URL' : ''}
              />

              <TextField
                sx={{ mt: 1 }}
                label="Website"
                value={newResource.website}
                // Updates the 'website' property of the 'newResource' state when the input value changes
                onChange={(event) => setNewResource({ ...newResource, website: event.target.value })}
                // Validate the Website URL using the regex
                // A valid Website URL starts with "http://" or "https://"
                error={!urlRegex.test(newResource.website) && newResource.website !== ''}
                helperText={newResource.website !== '' && !urlRegex.test(newResource.website) ? 'Invalid Website URL' : ''}
              />
              <TextField
                sx={{ mt: 1 }}
                label="Email"
                type="email"
                value={newResource.email}
                // Updates the 'email' property of the 'newResource' state when the input value changes
                onChange={(event) => setNewResource({ ...newResource, email: event.target.value })}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" // Regular expression for email validation
              />
              <TextField
                sx={{ mt: 1 }}
                label="Address"
                value={newResource.address}
                // Updates the 'address' property of the 'newResource' state when the input value changes
                onChange={(event) => setNewResource({ ...newResource, address: event.target.value })}
              />
              <TextField
                sx={{ mt: 1 }}
                select
                value={newResource.organization_id}
                // Updates the 'organization' property of the 'newResource' state when the input value changes
                SelectProps={{
                  native: true,
                }}
                onChange={(event) => setNewResource({ ...newResource, organization_id: event.target.value })}
                required // This makes the field mandatory
              >
                <option value={0}>Pick organization</option>
                {organizations.map((organization) => (
                  <option key={organization.id} value={organization.id}>
                    {organization.name}
                  </option>
                ))}
              </TextField>

              {/* This is a form select input for choosing a resource stage. */}
              <TextField
                sx={{ mt: 1 }}
                select
                value={newResource.stage_id}
                SelectProps={{
                  native: true,
                }}
                // Updates the 'organization_id' property of the 'newResource' state when the selected value changes
                onChange={(event) => setNewResource({ ...newResource, stage_id: event.target.value })}
                required // This makes the field mandatory
              >
                {/* A default option prompting the user to select a stage */}
                <option value={0}>Pick Stage</option>
                {/* Mapping over the 'stages' array to create an option for each stage */}
                {stages.map((stage) => (
                  <option key={stage.id} value={stage.id}>
                    {stage.name}
                  </option>
                ))}
              </TextField>
              <Button sx={{ mt: 1 }} variant="contained" color="primary" type="submit">
                Add Resource
              </Button>
            </form>
          </Paper>

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
        </Box>
      </Paper>
    </Container>
  );
}

export default AdminPage;