import { useState } from "react"
import { useDispatch } from "react-redux";
import { Grid, Paper, Typography, TextField, Button, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'; //Added DeleteIcon, delete option
import EditIcon from '@mui/icons-material/Edit'; //Added EditIcon, update option
import SaveIcon from '@mui/icons-material/Save'; // Added SaveIcon, save option
import CancelIcon from '@mui/icons-material/Cancel'; // Added CancelIcon, cancel option
import InfoIcon from '@mui/icons-material/Info'; //Added InfoIcon, info on how things work

export default function EntrepreneurForm({ entrepreneur }) {

    const dispatch = useDispatch();
    const [newEntrepreneur, setNewEntrepreneur] = useState('')
    const [editedEntrepreneur, setEditedEntrepreneur] = useState('');

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
            alert('Please enter a non-empty entrepreneur title.');
        }
    }

    return (
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
                                            // onClick={() => handleSaveEditedStage(e.id)}
                                            >
                                                <SaveIcon />
                                            </IconButton>
                                            <IconButton
                                                color="secondary"
                                                aria-label="Cancel edit stage"
                                            // onClick={handleCancelEditStage}
                                            >
                                                <CancelIcon />
                                            </IconButton>
                                        </>
                                    ) : (
                                        <IconButton
                                            color="primary"
                                            aria-label="Edit entrepreneur"
                                        // onClick={() => handleEditStage(e.id, e.name)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                    <IconButton
                                        color="secondary"
                                        aria-label="Delete entrepreneur"
                                    // onClick={() => handleDeleteStage(e.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <form className="admin-form"
                    // onSubmit={handleAddStage}
                    >
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
    )
}