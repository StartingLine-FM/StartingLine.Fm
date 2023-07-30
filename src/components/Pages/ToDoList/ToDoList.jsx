import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, React } from 'react';
import {
    Typography, Container, Paper, ListSubheader, Button, List, ListItemButton,
    ListItemText, ListItemIcon, ListItem, IconButton, Modal, Box, Dialog, DialogContent, DialogTitle,
    Grid,
    TextField
} from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AnimatePresence, motion } from 'framer-motion';
import ToDoListModal from './ToDoListModal';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SaveIcon from '@mui/icons-material/Save';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AddIcon from '@mui/icons-material/Add';


export default function ToDoList() {
    // set state for edit mode
    const [editMode, setEditMode] = useState(false);
    // set state for selected resource
    const [selectedResource, setSelectedResource] = useState(null);
    // use state for edit inputs
    const [newCompleted, setNewCompleted] = useState(false);
    const [newNotes, setNewNotes] = useState('');
    const [newName, setNewName] = useState('');
    const [newTitleEditMode, setNewTitleEditMode] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    // set modal state
    const [isModalOpen, setIsModalOpen] = useState(false)

    // init dispatch
    const dispatch = useDispatch();

    // grab titles from the title reducer
    const list_titles = useSelector(store => store.tableListReducer);
    // grab reesources from the store
    const title_resources = useSelector(store => store.todoListResourcesReducer);
    // state for checkboxes

    // toggle modals
    const handleOpen = () => {
        setIsModalOpen(true);
    }

    const handleClose = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
        dispatch({ type: "FETCH_TABLE_LISTS" })
    }, [])

    // copy to clipboard functionality
    const copyResourcesToClipboard = (title_table_id) => {
        // Find all resources with the specified title_table_id
        const resourcesToCopy = title_resources.filter(resource => resource.title_table_id === title_table_id);

        // Format the resources as a string
        const resourcesString = resourcesToCopy.map(resource => `${resource.resource_name}: ${resource.notes}`).join('\n');

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


    const putResource = (resource, check) => {
        let name;
        let notes;
        let completed = false;
        let title_table_id = resource.title_table_id;
        let id = resource.resource_id;
        let todo_id = resource.id;

        newName ? name = newName : name = resource.resource_name;
        newNotes ? notes = newNotes : notes = resource.notes;
        // logic for completed
        if (newCompleted === false) {
            completed = false;
        } else {
            completed = newCompleted;
        }

        // check
        if (check) {
            completed = !resource.completed;
        } else {
            completed = resource.completed
        }

        // send off updated resource
        dispatch({
            type: 'PUT_TODO_LIST',
            payload: {
                title_table_id,
                id,
                name,
                notes,
                completed,
                todo_id
            }
        })

        // clear the inputs
        clearInputs();

        handleClose();
    }
    // clear inputs
    const clearInputs = () => {
        setNewNotes('');
        setNewName('');
        setNewCompleted(false);
    }


    // changes the background color of a list item based on the resource's "completed" key
    const listStyle = (resource) => {
        if (resource.completed) {
            return {
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                maxWidth: '100%',
                bgcolor: 'lightgray',
            }
        } else return {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            maxWidth: '100%',
            bgcolor: 'background.paper'
        }
    }

    // TODO create toggle for prgramatic refresh of page

    return (
        <>
            <Grid container >
                {/* Sidebar */}
                <Grid item md={4} xs={12}>
                    <Container sx={{ padding: 4 }}>
                        <Paper sx={{ flexDirection: 'column', width: '100%', paddingRight: 2, display: 'flex', justifyContent: 'flex-end', height: '100%' }} elevation={2}>
                        <Typography variant='h4' gutterBottom align='center'>Todo Lists</Typography>
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                {list_titles.map((list, i) => (
                                    <ListItem key={i} secondaryAction={
                                        <IconButton color='secondary' onClick={() => dispatch({ type: "CLEAR_TODO_LIST", payload: { title_table_id: list.id } })} edge={'end'} aria-label={'delete'}>
                                            <DeleteIcon />
                                        </IconButton>
                                    }>
                                        <ListItemButton onClick={() => { setSelectedResource(list.id); dispatch({ type: "FETCH_TODO_LIST_RESOURCES", payload: list.id }) }} key={i}>
                                            <ListItemText variant='h4' >{list.title}</ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                                {newTitleEditMode ? <ListItem secondaryAction={<IconButton  edge='end' onClick={() => {setNewTitleEditMode(false); dispatch({ type: "POST_NEW_TITLE", payload: {title: newTitle}}); setNewTitle('')}} aria-label='save'>
                                <SaveIcon />
                                </IconButton>}>
                                    <TextField variant='filled' placeholder={newTitle} value={newTitle} onChange={(e) => setNewTitle(e.target.value)}>Add A New To Do List</TextField></ListItem> :
                                <ListItem secondaryAction={<IconButton color='primary' edge='end' onClick={() => {setNewTitleEditMode(true)}} aria-label={'copy'}>
                                        <AddIcon />
                                    </IconButton>}>
                                        <ListItemButton><ListItemText variant='h4'>Add A New To Do List</ListItemText>
                                </ListItemButton>
                                </ListItem>}
                            </List>
                        </Paper>
                    </Container>
                </Grid>

                {/* Center Content */}
                <Grid item md={8} xs={12}>
                    <Container sx={{ padding: 4 }}>
                        <Paper sx={{ flexDirection: 'column', width: '100%', display: 'flex', justifyContent: 'flex-end', height: '100%' }} elevation={2}>
                        <Typography variant='h4' gutterBottom align='center'>Resources</Typography>
                            {title_resources.length > 0 && <ListItem  sx={{ justifyContent: 'right' }}><IconButton color='primary' onClick={() => copyResourcesToClipboard(selectedResource)} aria-label={'copy'}>
                                <FileCopyIcon />
                            </IconButton></ListItem>}
                            {title_resources.map((resource, i) => (
                                <Container sx={listStyle(resource)} key={resource.id} >
                                    <List sx={listStyle(resource)} >
                                        <ListItem key={resource.id} secondaryAction={
                                            <IconButton color='secondary' onClick={() => dispatch({ type: "DELETE_TODO_LIST_RESOURCE", payload: { id: resource.id, title_table_id: resource.title_table_id } })} edge={'end'} aria-label={'delete'}>
                                                <DeleteIcon />
                                            </IconButton>}>
                                            <ListItem>
                                                <ListItemText onClick={() => { setSelectedResource(resource.id); handleOpen(); }}>{resource.resource_name}</ListItemText>
                                            </ListItem>
                                            {editMode && selectedResource === resource.id ? <ListItem><TextField value={newNotes} onChange={(e) => setNewNotes(e.target.value)} variant='filled' placeholder={resource.notes}>{resource.notes ? resource.notes : <em>Click edit button to add notes</em>}</TextField></ListItem> :
                                                <ListItem>
                                                    <ListItemText>{resource.notes ? resource.notes : <em>Click edit to add notes</em>}</ListItemText>
                                                </ListItem>}
                                            {editMode && selectedResource === resource.id ? <ListItem><Button
                                                variant='text'
                                                onClick={() => setNewCompleted((prevCompleted) => !prevCompleted)}
                                            >
                                                {newCompleted ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                                            </Button></ListItem> :
                                                <ListItemButton onClick={() => putResource(resource, true)}>
                                                    <ListItemText >{resource.completed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}</ListItemText>
                                                </ListItemButton>}


                                            {editMode && selectedResource === resource.id ? <IconButton color='primary' onClick={() => { putResource(resource); setEditMode(false) }}>
                                                <SaveIcon />
                                            </IconButton> :
                                                <IconButton color='primary'  onClick={() => { setEditMode(true); setSelectedResource(resource.id); }} aria-label={'delete'}>
                                                    <ModeEditIcon />
                                                </IconButton>}

                                        </ListItem>
                                    </List>
                                    <AnimatePresence>
                                        {selectedResource === resource.id && (
                                            <ToDoListModal
                                                isModalOpen={isModalOpen}
                                                handleClose={handleClose}
                                                resource={resource}
                                                setSelectedResource={setSelectedResource}
                                            />
                                        )}
                                    </AnimatePresence>
                                </Container>
                            ))}
                        </Paper>
                    </Container>
                </Grid>
            </Grid>
        </>
    );
}
