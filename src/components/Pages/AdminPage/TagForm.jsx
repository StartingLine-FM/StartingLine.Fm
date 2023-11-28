import { useState } from "react"
import { useDispatch } from "react-redux";
import { Grid, Paper, Typography, TextField, Button, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'; //Added DeleteIcon, delete option
import EditIcon from '@mui/icons-material/Edit'; //Added EditIcon, update option
import SaveIcon from '@mui/icons-material/Save'; // Added SaveIcon, save option
import CancelIcon from '@mui/icons-material/Cancel'; // Added CancelIcon, cancel option
// import InfoIcon from '@mui/icons-material/Info'; //Added InfoIcon, info on how things work

export default function TagForm({ tagRedux, tagTitle, size, column }) {

    const [newName, setNewName] = useState('');
    const [editedName, setEditedName] = useState('');
    const dispatch = useDispatch()

    const handleAdd = (event) => {
        // This function prevents the default form submission event
        event.preventDefault();
        // Checks if the new name is not an empty string before dispatching the action to add the new 
        if (newName !== '' && column === 'name') {
            // Dispatches a Redux action of type 'POST_' with the new  name as the payload
            dispatch({ type: `POST_${tagTitle.toUpperCase()}`, payload: { name: newName } });
            // Resets the new name state variable to an empty string
            setNewName('');
        } else if (newName !== '' && column === 'title') {
            // Dispatches a Redux action of type 'POST_' with the new  name as the payload
            dispatch({ type: `POST_${tagTitle.toUpperCase()}`, payload: { title: newName } });
            // Resets the new  name state variable to an empty string
            setNewName('');
        } else {
            // If the new  name is an empty string, an alert message is shown asking the user to enter a non-empty  name
            alert('Please enter a non-empty name.');
        }
    };

    // Function to initiate the editing process of a 
    const handleEdit = (Id, currentName) => {
        // Sets the state variable 'editedName' to the current  name that is to be edited
        if (column === 'name') {
            setEditedName({ id: Id, name: currentName });
        } else setEditedName({ id: Id, title: currentName })
        // Refetches the s data
        dispatch({ type: `FETCH_${tagTitle.toUpperCase()}` });
    };

    // Function to save the changes made to the  name
    const handleSaveEdit = (Id) => {
        // Dispatches a Redux action of type 'UPDATE_' with the new  name and its id as the payload
        if (column === 'name') {
            dispatch({ type: `UPDATE_${tagTitle.toUpperCase()}`, payload: { id: Id, name: editedName.name } });
            // Resets the 'editedName' state variable to an empty string after the  name has been updated
            setEditedName('');
        } else
            dispatch({ type: `UPDATE_${tagTitle.toUpperCase()}`, payload: { id: Id, title: editedName.title } });
        // Resets the 'editedName' state variable to an empty string after the  name has been updated
        setEditedName('');
        // Refetches the s data to reflect the changes
        dispatch({ type: `FETCH_${tagTitle.toUpperCase()}` });
    };

    // Function to cancel the editing process of a 
    const handleCancelEdit = () => {
        // Resets the 'editedName' state variable to an empty string to cancel the editing process
        setEditedName('');
    };

    const handleDelete = (Id) => {
        // Asks for the user's confirmation before deleting the 
        if (window.confirm('Are you sure you want to delete this ?')) {
            // If the user confirms the deletion, it dispatches a Redux action of type 'DELETE_' 
            // with the id of the  to be deleted as the payload
            dispatch({ type: `DELETE_${tagTitle.toUpperCase()}`, payload: Id });
        }
    };

    return (
        <Grid item xs={12} md={size}>
            <Paper sx={{ p: 3, m: 2 }}>
                <Typography
                    variant="h6"
                    component="h6"
                    align="center"
                    color="primary"
                    sx={{ mb: 2 }}
                >
                    {tagTitle} Types
                </Typography>
                <Grid item container spacing={2}>
                    {tagRedux.map(tag => {
                        return (
                            <Grid item container key={tag.id}>
                                {
                                    editedName && tag.id === editedName.id ? (
                                        // Show the input field for editing the  name
                                        <Grid item xs={8}>
                                            <TextField
                                                value={
                                                    column === 'name' ? editedName.name : editedName.title
                                                }
                                                size='small'
                                                onChange={(event) =>
                                                    column === 'name'
                                                        ? setEditedName({ ...editedName, name: event.target.value })
                                                        : setEditedName({ ...editedName, title: event.target.value })
                                                }
                                            />
                                        </Grid>
                                    ) : (
                                        // Display the  name
                                        <Grid item xs={8}>
                                            {tag.title || tag.name}
                                        </Grid>
                                    )
                                }

                                {
                                    editedName && tag.id === editedName.id ? (
                                        <Grid item xs={4}>
                                            <IconButton
                                                aria-label="Save "
                                                onClick={() => handleSaveEdit(tag.id)}
                                            >
                                                <SaveIcon />
                                            </IconButton>
                                            <IconButton
                                                aria-label="Cancel edit "
                                                onClick={handleCancelEdit}
                                            >
                                                <CancelIcon />
                                            </IconButton>
                                        </Grid>
                                    ) : (
                                        <Grid item xs={4}>
                                            <IconButton
                                                aria-label="Edit "
                                                onClick={() => handleEdit(tag.id, (
                                                    column === 'name'
                                                        ? tag.name
                                                        : tag.title
                                                ))}
                                            >
                                                <EditIcon />
                                            </IconButton>

                                            <IconButton
                                                aria-label="Delete "
                                                onClick={() => handleDelete(tag.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    )
                                }
                            </Grid>
                        )
                    })}
                    <Grid item xs={12}>
                        <TextField
                            size="small"
                            label={`New ${tagTitle}`}
                            fullWidth
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleAdd}
                        >
                            Add {tagTitle} Tag
                        </Button>
                    </Grid>
                </Grid>
            </Paper >
        </Grid >
    )
}