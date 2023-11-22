// hooks
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
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
// components
import './ToDoList.css'
import AnonToDoModal from './AnonToDoModal';


export default function AnonToDo({ handleOpenRegister }) {

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
        newNotes ? (notes = newNotes) : (notes = resource.notes);

        console.log('Updating resource with the following notes:', notes);
        console.log('Resource ID:', resource.objectID);

        // send off updated resource
        dispatch({
            type: 'PUT_ANON_TODO_LIST',
            payload: {
                id: resource.objectID,
                notes,
            },
        });

        // clear the inputs
        setNewNotes('');
        setEditMode(false);
    };



    // closes AnonToDoModal
    const handleClose = () => {
        setOpen(false);
        setSelectedResource(null);
    }

    // deletes a resource from to-do list
    const deleteResource = (resource) => {
        dispatch({
            type: 'DELETE_ANON_TODO_LIST',
            payload: resource.objectID
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

    // Redux    
    const title_resources = useSelector(store => store.todoListResourcesReducer);
    const dispatch = useDispatch();

    return (
        <Container sx={{ flexDirection: 'column', display: 'flex', alignContent: 'center', justifyContent: 'center', maxWidth: '100%' }}>
            <Paper sx={{ mt: 3, flexDirection: 'column', display: 'flex', alignContent: 'center', justifyContent: 'center', width: '100%' }} elevation={2}>
                <Typography variant='h4' align='center' pt={3} color="primary">TO-DO</Typography>
                <Typography paragraph align="center" variant="body2" m={2} >
                    Welcome to the To-Do page! You can add resources to this page by clicking on the plus icon for any entry you're interested in on the search page.
                    Once you've added resources, you will be able to add notes or remove resources. Need to take your to-do list with you? You can copy
                    the entire list to your clipboard, or create an account to save multiple to-do lists to your profile.
                </Typography>
                {/* Warning about temporary list */}
                <Typography sx={{ px: 3, pb: 3 }} color="error" align="center" variant="body2">
                    Note: If you don't create an account to save your to-do list OR copy and paste to your own records,
                    <br />
                    <u>your list will not be saved and will be lost when you refresh / close this page.</u>
                </Typography>
                {title_resources.length > 0 &&
                    // Copy button
                    <ListItem sx={{ justifyContent: 'right' }}>
                        <Tooltip placement="left" title="Copy to Clipboard">
                            <IconButton color="primary" onClick={() => copyResourcesToClipboard()} aria-label={'copy'}>
                                <FileCopyIcon />
                            </IconButton>
                        </Tooltip>
                    </ListItem>}
                {/* To-do list resources */}
                {title_resources.length > 0
                    && title_resources.map((resource, i) => (
                        <>
                            <List key={resource.id} sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '100%',
                                maxWidth: '100%',
                                bgcolor: 'background.paper'
                            }}>
                                {/* Opens AnonToDoModal */}
                                <ListItem sx={{ fontSize: { xs: 12, md: 16 } }} >
                                    <Tooltip title="Click to view more details">
                                        <ListItemButton onClick={() => { setSelectedResource(resource.objectID); setOpen(true); }} >{resource.name}</ListItemButton>
                                    </Tooltip>
                                </ListItem>
                                {editMode && selectedResource === resource.objectID
                                    // if in Edit Mode, show text fields
                                    ? <ListItem sx={{ width: { xs: "100%" } }}>
                                        <ListItemText>
                                            {/* Show current notes as placeholder text if populated */}
                                            {resource.notes
                                                ? <TextField
                                                    placeholder={resource.notes}
                                                    size='small'
                                                    value={newNotes}
                                                    onChange={e => setNewNotes(e.target.value)}
                                                />
                                                : <TextField
                                                    sx={{ maxWidth: 1000 }}
                                                    label="Edit Notes"
                                                    size='small'
                                                    value={newNotes}
                                                    onChange={e => setNewNotes(e.target.value)}
                                                />}
                                        </ListItemText>
                                    </ListItem>
                                    : <ListItem>
                                        <ListItemText>
                                            {/* Generic message displays if list item has no notes */}
                                            <Typography sx={{ fontSize: { xs: 12, md: 16 } }}>
                                                {resource.notes ? resource.notes : <em>Click edit button to add notes</em>}
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                }
                                {editMode && selectedResource === resource.objectID
                                    // if this resource is in Edit Mode, show Save and Close buttons
                                    ? <>
                                        <ListItem sx={{ width: { xs: 50, md: 100 } }}>
                                            <Tooltip title="Save Changes">
                                                <IconButton onClick={() => putResource(resource)}>
                                                    <SaveIcon color="primary" />
                                                </IconButton>

                                            </Tooltip>
                                        </ListItem>
                                        <ListItem sx={{ width: { xs: 65, md: 100 } }}>
                                            <Tooltip title="Cancel Edit">
                                                <IconButton onClick={() => setEditMode(false)}>
                                                    <CloseIcon color="secondary" />
                                                </IconButton>
                                            </Tooltip>
                                        </ListItem>
                                    </>
                                    // if not in Edit Mode, show Edit and Delete buttons
                                    : <>
                                        <Tooltip title="Edit Notes">
                                            <ListItem sx={{ width: { xs: 50, md: 100 } }}>
                                                <IconButton onClick={() => { setSelectedResource(resource.objectID); setEditMode(true) }}>
                                                    <ModeEditIcon color="primary" />
                                                </IconButton>
                                            </ListItem>
                                        </Tooltip>

                                        <ListItem sx={{ width: { xs: 65, md: 100 } }}>
                                            <Tooltip title="Delete Item">
                                                <IconButton onClick={() => deleteResource(resource)}>
                                                    <DeleteIcon color="secondary" />
                                                </IconButton>
                                            </Tooltip>
                                        </ListItem>
                                    </>
                                }
                            </List>
                            {selectedResource === resource.objectID && (
                                <AnonToDoModal
                                    open={open}
                                    setSelectedResource={setSelectedResource}
                                    resource={resource}
                                    handleClose={handleClose} />
                            )}
                        </>
                    ))

                }
                {/* Only render register button if a list item has been added */}
                {title_resources.length > 0 &&
                    <Box textAlign={'center'} m={3}>
                        <Button align="center" variant='text' onClick={handleOpenRegister}>Register to save your list</Button>
                    </Box>
                }
            </Paper>
        </Container >
    )
}