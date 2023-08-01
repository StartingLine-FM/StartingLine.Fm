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
    ListItem,
    IconButton,
    TextField,
    Button,
    Box,
    Tooltip
} from '@mui/material';
// MUI Icons
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import FileCopyIcon from '@mui/icons-material/FileCopy';
// framer
import { AnimatePresence, motion } from 'framer-motion';
// components
import './ToDoList.css'
import AnonToDoModal from './AnonToDoModal';


export default function AnonToDo({ handleOpenRegister, handleOpen }) {

    // set state for edit mode
    const [editMode, setEditMode] = useState(false)
    // set state for selected resource
    const [selectedResource, setSelectedResource] = useState(null);
    // set modal state
    const [open, setOpen] = useState(false);
    // new values to update
    const [newNotes, setNewNotes] = useState('');
    // set register modal state
    const [registerModal, setRegisterModal] = useState(false);
    // handler for opening register modal
    const handleRegisterModalOpen = () => {
        setRegisterModal(true);
    }

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

    // copy to clipboard functionality
    const copyResourcesToClipboard = () => {
        // Find all resources with the specified title_table_id

        // Format the resources as a string
        const resourcesString = title_resources.map(resource => {
            return (
                resource.notes
                    ? `${resource.name}: ${resource.notes}`
                    : `${resource.name}`
            )
        }).join('\n');

        // Write the formatted string to the clipboard
        navigator.clipboard.writeText(resourcesString)
            .then(() => {
                alert('Resources copied to clipboard!');
            })
            .catch((error) => {
                alert('Failed to copy resources to clipboard.');
                console.error('Clipboard writeText error:', error);
            });
    };

    // changes the background color of a list item based on the resource's "completed" key
    const listStyle = (resource) => {
        if (resource.completed) {
            return {
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                maxWidth: '100%',
                bgcolor: 'lightgray'
            }
        } else return {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            maxWidth: '100%',
            bgcolor: 'background.paper'
        }
    }

    // Redux    
    const title_resources = useSelector(store => store.todoListResourcesReducer);
    const dispatch = useDispatch();

    return (
        <Container registerModal={registerModal} open={handleRegisterModalOpen} sx={{ flexDirection: 'column', display: 'flex', alignContent: 'center', justifyContent: 'center', maxWidth: '100%' }}>
            <Paper sx={{ mt: 3, flexDirection: 'column', display: 'flex', alignContent: 'center', justifyContent: 'center', width: '100%' }} elevation={2}>
                <Typography variant='h4' align='center' pt={3} color="primary">TO-DO</Typography>
                <Typography paragraph align="center" variant="body2" m={2} >
                    Welcome to the To-Do page! You can add resources to this page by clicking on the plus icon for any entry you're interested in on the search page.
                    Once you've added resources, you will be able to add notes, mark entries as complete, or remove them. Need to take your to-do list with you? You can copy
                    the entire list to your clipboard, or create an account to save multiple to-do lists to your profile.
                </Typography>
                    <Typography sx={{px:3}} color="error" align="center" variant="body2">
                        Note: If you don't create an account to save your todo list OR copy and paste to your own records, <u>your list will not be saved and will be lost when you refresh / close this page.</u>
                    </Typography>
                {title_resources.length > 0 &&
                    <ListItem sx={{ justifyContent: 'right' }}>
                        <Tooltip placement="left" title="Copy to Clipboard">
                            <IconButton color="primary" onClick={() => copyResourcesToClipboard()} aria-label={'copy'}>
                                <FileCopyIcon />
                            </IconButton>
                        </Tooltip>
                    </ListItem>}
                {title_resources.length > 0
                    && title_resources.map((resource, i) => (
                        <>
                            <List key={resource.id} sx={listStyle(resource)}>
                                <ListItem >
                                    <Tooltip title="Click to view more details">
                                        <ListItemButton onClick={() => { setSelectedResource(resource.id); setOpen(true); }} >{resource.name}</ListItemButton>
                                    </Tooltip>
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
                                        <ListItemText>
                                            <Typography variant="body2">
                                                {resource.notes ? resource.notes : <em>Click edit button to add notes</em>}
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                }
                                {editMode && selectedResource === resource.id
                                    ? <>
                                        <ListItem sx={{ width: 100 }}>
                                            <Tooltip title="Save Changes">
                                                <IconButton onClick={() => putResource(resource)}>
                                                    <SaveIcon color="primary" />
                                                </IconButton>
                                            </Tooltip>
                                        </ListItem>
                                        <ListItem sx={{ width: 100 }}>
                                            <Tooltip title="Cancel Edit">
                                                <IconButton onClick={() => setEditMode(false)}>
                                                    <CloseIcon color="secondary" />
                                                </IconButton>
                                            </Tooltip>
                                        </ListItem>
                                    </>
                                    : <>
                                        <Tooltip title="Edit Notes">
                                            <ListItem sx={{ width: 100 }}>
                                                <IconButton onClick={() => { setSelectedResource(resource.id); setEditMode(true) }}>
                                                    <ModeEditIcon color="primary" />
                                                </IconButton>
                                            </ListItem>
                                        </Tooltip>

                                        <ListItem sx={{ width: 100 }}>
                                            <Tooltip title="Delete Item">
                                                <IconButton onClick={() => deleteResource(resource.id)}>
                                                    <DeleteIcon color="secondary" />
                                                </IconButton>
                                            </Tooltip>
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
                }
                <Box textAlign={'center'} m={3}>
                    <Button align="center" variant='text' onClick={handleOpenRegister}>Register to save your list</Button>
                </Box>
            </Paper>
        </Container>
    )
}