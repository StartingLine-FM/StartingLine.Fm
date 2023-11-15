import { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Typography, Paper, Button, Tooltip, TextField, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'; //Added DeleteIcon, delete option
import EditIcon from '@mui/icons-material/Edit'; //Added EditIcon, update option
import SaveIcon from '@mui/icons-material/Save'; // Added SaveIcon, save option
import CancelIcon from '@mui/icons-material/Cancel'; // Added CancelIcon, cancel option
import InfoIcon from '@mui/icons-material/Info'; //Added InfoIcon, info on how things work

export default function OrganizationForm({ organizations }) {

    const [newOrganization, setNewOrganization] = useState('');
    const [editedOrganizationName, setEditedOrganizationName] = useState('');
    const dispatch = useDispatch();

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

    return (
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
    )
}