// hooks
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
// MUI
import {
    Typography,
    Container, Paper,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    ListItem,
    IconButton,
    TextField
} from '@mui/material';
// MUI Icons
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
// framer
import { AnimatePresence, motion } from 'framer-motion';
// components
import './ToDoList.css'
import AnonToDoModal from './AnonToDoModal';


export default function AnonToDo() {

    // set state for edit mode
    const [editMode, setEditMode] = useState(false)
    // set state for selected resource
    const [selectedResource, setSelectedResource] = useState(null);
    // set modal state
    const [open, setOpen] = useState(false);
    // new values to update
    const [newNotes, setNewNotes] = useState('');

    // update a resource
    const putResource = (resource) => {
        let notes;

        // if notes have been changed, send newNotes, else send whatever is already there
        newNotes ? notes = newNotes : notes = resource.notes;

        // send off updated resource
        dispatch({
            type: 'PUT_ANON_TODO_LIST',
            payload: {
                id: resource.id,
                notes,
            }
        })

        // clear the inputs
        setNewNotes('');
        setEditMode(false);
    }

    const handleClose = () => {
        setOpen(false);
        setSelectedResource(null);
    }

    const deleteResource = (id) => {
        dispatch({
            type: 'DELETE_ANON_TODO_LIST',
            payload: id
        })
    }

    // changes the background color of a list item based on the resource's "completed" key
    const listStyle = (resource) => {
        if (resource.completed) {
            return { 
                display: 'flex', 
                flexDirection: 'row', 
                width: '100%', 
                maxWidth: '100%', 
                bgcolor: 'lightgray' }
        } else return { 
            display: 'flex', 
            flexDirection: 'row', 
            width: '100%', 
            maxWidth: '100%', 
            bgcolor: 'background.paper' }
    }

    // Redux    
    const title_resources = useSelector(store => store.todoListResourcesReducer);
    const dispatch = useDispatch();

    return (
        <Container sx={{ flexDirection: 'column', display: 'flex', alignContent: 'center', justifyContent: 'center', maxWidth: '100%' }}>
            <Typography variant='h4' gutterBottom align='center' py={4}>TO-DO</Typography>
            <Paper sx={{ flexDirection: 'column', display: 'flex', alignContent: 'center', justifyContent: 'center', width: '100%' }} elevation={2}>
                {title_resources.length > 0
                    ? title_resources.map((resource, i) => (
                        <>
                            <List key={resource.id} sx={listStyle(resource)}>
                                <ListItem >
                                    <ListItemButton onClick={() => { setSelectedResource(resource.id); setOpen(true); }} >{resource.name}</ListItemButton>
                                </ListItem>
                                {editMode && selectedResource === resource.id
                                    ? <ListItem>
                                        <ListItemText component={motion.h4}>
                                            {resource.notes
                                                ? <TextField
                                                    placeholder={resource.notes}
                                                    size='small'
                                                    value={newNotes}
                                                    onChange={e => setNewNotes(e.target.value)}
                                                />
                                                : <TextField
                                                    label="Edit Notes"
                                                    size='small'
                                                    value={newNotes}
                                                    onChange={e => setNewNotes(e.target.value)}
                                                />}
                                        </ListItemText>
                                    </ListItem>
                                    : <ListItem>
                                        <ListItemText component={motion.h4}>
                                            {resource.notes ? resource.notes : <em>Click edit button to add notes</em>}
                                        </ListItemText>
                                    </ListItem>
                                }
                                {editMode && selectedResource === resource.id
                                    ? <>
                                        <ListItem sx={{ width: 100 }}>
                                            <IconButton onClick={() => putResource(resource)}>
                                                <SaveIcon />
                                            </IconButton>
                                        </ListItem>
                                        <ListItem sx={{ width: 100 }}>
                                            <IconButton onClick={() => setEditMode(false)}>
                                                <CloseIcon />
                                            </IconButton>
                                        </ListItem>
                                    </>
                                    : <>
                                        <ListItem sx={{ width: 100 }}>
                                            <IconButton onClick={() => { setSelectedResource(resource.id); setEditMode(true) }}>
                                                <ModeEditIcon />
                                            </IconButton>
                                        </ListItem>
                                        <ListItem sx={{ width: 100 }}>
                                            <IconButton onClick={() => deleteResource(resource.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItem>
                                    </>
                                }
                            </List>
                            <AnimatePresence>
                                {selectedResource === resource.id && (
                                    <AnonToDoModal
                                        open={open}
                                        setSelectedResource={setSelectedResource}
                                        resource={resource}
                                        handleClose={handleClose} />
                                )}
                            </AnimatePresence>
                        </>
                    ))
                    :
                    <Typography paragraph align="center" variant="body2" m={2} >
                        Welcome to the To-Do page! You can add resources to this page by clicking on the star icon for any entry you're interested in on the search page.
                        Once you've added resources, you will be able to add notes, mark entries as complete, or remove them. Need to take your to-do list with you? You can copy
                        the entire list to your clipboard, or create an account to save multiple to-do lists to your profile.
                    </Typography>

                }
            </Paper>
        </Container>
    )
}