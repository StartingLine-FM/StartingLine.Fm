import { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Paper, TextField, Typography, Tooltip, Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'; //Added DeleteIcon, delete option
import EditIcon from '@mui/icons-material/Edit'; //Added EditIcon, update option
import SaveIcon from '@mui/icons-material/Save'; // Added SaveIcon, save option
import CancelIcon from '@mui/icons-material/Cancel'; // Added CancelIcon, cancel option
import InfoIcon from '@mui/icons-material/Info'; //Added InfoIcon, info on how things work

export default function StageForm({ stages }) {

    const [newStage, setNewStage] = useState('');
    const [editedStageName, setEditedStageName] = useState('');
    const dispatch = useDispatch();

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
        dispatch({ type: 'FETCH_STAGE' });
    };

    // Function to save the changes made to the stage name
    const handleSaveEditedStage = (stageId) => {
        // Dispatches a Redux action of type 'UPDATE_STAGE' with the new stage name and its id as the payload
        dispatch({ type: 'UPDATE_STAGE', payload: { id: stageId, name: editedStageName.name } });
        // Resets the 'editedStageName' state variable to an empty string after the stage name has been updated
        setEditedStageName('');
        // Refetches the stages data to reflect the changes
        dispatch({ type: 'FETCH_STAGE' });
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
    )
}