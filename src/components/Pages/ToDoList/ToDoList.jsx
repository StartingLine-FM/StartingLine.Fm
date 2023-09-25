import { useSelector, useDispatch } from 'react-redux'; // imports for redux
import { useEffect, useState, React } from 'react'; // imports for react
// import for material ui icons
import {
    Typography, Container, Paper, Button, List, ListItemButton,
    ListItemText, ListItem, IconButton, Modal, Box,
    Grid,
    TextField,
    Tooltip,
} from '@mui/material';

// framer motion imports
import { AnimatePresence, motion } from 'framer-motion';

// material icons
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import ToDoListModal from './ToDoListModal';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SaveIcon from '@mui/icons-material/Save';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close'


export default function ToDoList({ currentList, setCurrentList }) {
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
    // grab resources from the store
    const title_resources = useSelector(store => store.todoListResourcesReducer);

    // toggle modals
    const handleOpen = () => {
        setIsModalOpen(true);
    }

    const handleClose = () => {
        setIsModalOpen(false);
    }
    // use effect to dispatch the table lists on load
    useEffect(() => {
        dispatch({ type: "FETCH_TABLE_LISTS" })
    }, [])

    // copy to clipboard functionality
    const copyResourcesToClipboard = (title_table_id) => {
        // Find all resources with the specified title_table_id
        const resourcesToCopy = title_resources.filter(resource => resource.title_table_id === title_table_id);
        console.log(resourcesToCopy)

        // Format the resources as a string
        const resourcesString = resourcesToCopy.map(resource => resource.notes ? `${resource.resource_name}: ${resource.notes}` : `${resource.resource_name}`).join('\n');

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

    // function to update a resource on click
    const putResource = (resource, check) => {
        let name;
        let notes;
        let completed;
        let title_table_id = resource.title_table_id;
        let id = resource.resource_id;
        let todo_id = resource.id;

        newName ? name = newName : name = resource.resource_name;
        newNotes ? notes = newNotes : notes = resource.notes;
        newCompleted ? completed = newCompleted : completed = resource.completed;

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
                completed: newCompleted ? newCompleted : completed,
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

    return (
        <>
            <Grid container >
                {/* to-do list title table */}
                <Grid item md={4} xs={12}>
                    <Container sx={{ padding: 3 }}>
                        <Paper sx={{ flexDirection: 'column', width: '100%', paddingRight: 2, display: 'flex', justifyContent: 'flex-end', height: '100%' }} elevation={2}>
                            <Typography variant='h4' color="primary" gutterBottom paddingLeft={3} pt={3} align='left'>To-Do Lists</Typography>
                            <Typography variant='text' gutterBottom paddingLeft={3} align='left'><em>Click on a list to see the items</em></Typography>
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                {list_titles.map((list, i) => (
                                    <ListItem key={i} secondaryAction={
                                        <IconButton color='secondary' onClick={() => dispatch({ type: "CLEAR_TODO_LIST", payload: { title_table_id: list.id } })} edge={'end'} aria-label={'delete'}>
                                            <DeleteIcon />
                                        </IconButton>
                                    }>
                                        <ListItemButton onClick={() => { setCurrentList(list.id); dispatch({ type: "FETCH_TODO_LIST_RESOURCES", payload: list.id }); }} key={i}>
                                            <ListItemText variant='h4' >{list.title}</ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                                {/* if new title edit mode is true show these components */}
                                {newTitleEditMode ? <ListItem
                                    secondaryAction={<Box>
                                        <IconButton onClick={() => { handleClose; setSelectedResource(null); setNewTitleEditMode(false); clearInputs(); }} edge={'start'} aria-label={'delete'}>
                                            <Tooltip title='Cancel' placement='top' arrow>
                                                <CloseIcon />
                                            </Tooltip>
                                        </IconButton>
                                        <IconButton color='primary' edge='end' onClick={() => { setNewTitleEditMode(false); dispatch({ type: "POST_NEW_TITLE", payload: { title: newTitle } }); setNewTitle('') }} aria-label='save'>
                                            <SaveIcon />
                                        </IconButton>
                                    </Box>}>
                                    <TextField variant='filled' placeholder={newTitle} value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}>Add A New To Do List</TextField></ListItem> :
                                    // if not display these componenets
                                    <ListItem secondaryAction={<IconButton color='primary' edge='end' onClick={() => { setNewTitleEditMode(true) }} aria-label={'copy'}>
                                        <AddIcon />
                                    </IconButton>}>
                                        <ListItem><ListItemText variant='h4'>Click the plus icon to add a list</ListItemText>
                                        </ListItem>
                                    </ListItem>}
                            </List>
                        </Paper>
                    </Container>
                </Grid>

                {/* resources table */}
                <Grid item md={8} xs={12}>
                    <Container sx={{ padding: 3 }}>
                        <Paper sx={{ flexDirection: 'column', width: '100%', display: 'flex', justifyContent: 'flex-end', height: '100%' }} elevation={2}>
                            {/* show if there are resources related to the title clicked on */}
                            {title_resources.length > 0 && (<Typography paddingRight={3.5} secondaryAction variant='h4' gutterBottom align='center' justifyContent={'left'}>
                                <span style={{ display: 'flex', alignContent: 'center', paddingLeft: 65, paddingTop: 20, justifyContent: 'space-between' }}>
                                    <Typography variant="h4" color="primary">Resources</Typography>
                                    <IconButton color='primary' onClick={() => copyResourcesToClipboard(currentList)} aria-label={'copy'}>
                                        <Tooltip title='Copy to clipboard' placement='top' arrow>
                                            <FileCopyIcon />
                                        </Tooltip>
                                    </IconButton></span></Typography>)}
                            {/* loop over the title resources */}
                            {title_resources.map((resource, i) => (
                                <Container sx={listStyle(resource)} key={resource.id} >
                                    <List sx={listStyle(resource)} >
                                        <ListItem key={resource.id} secondaryAction={
                                            <IconButton color='secondary' onClick={() => dispatch({ type: "DELETE_TODO_LIST_RESOURCE", payload: { id: resource.id, title_table_id: resource.title_table_id } })} edge={'end'} aria-label={'delete'}>
                                                <DeleteIcon />
                                            </IconButton>}>
                                            <Tooltip title="Click to see description" placement='left-start' arrow>
                                                <ListItem>
                                                    <Box>
                                                        <ListItemButton onClick={() => { setSelectedResource(resource.id); handleOpen(); }}>{resource.resource_name}</ListItemButton>
                                                    </Box>
                                                </ListItem>

                                            </Tooltip>
                                            {/* if edit mode is on and the selected resource state is the same as the id clicked on */}
                                            {editMode && selectedResource === resource.id ? <ListItem><TextField value={newNotes} onChange={(e) => setNewNotes(e.target.value)}
                                                variant='filled' placeholder={resource.notes}>{resource.notes ? resource.notes : <em>Click the edit icon to add notes</em>}</TextField></ListItem> :
                                                //  if not show these components
                                                <ListItem>
                                                    <ListItemText>{resource.notes ? resource.notes : <em>Click the edit icon to add notes</em>}</ListItemText>
                                                </ListItem>}
                                            {/* if edit mode is on and the selected resource state is the same as the id clicked on */}
                                            {editMode && selectedResource === resource.id ?
                                                <>
                                                    <Button
                                                        sx={{ color: 'black' }}
                                                        onClick={() => setNewCompleted(!newCompleted)}>
                                                        {newCompleted ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                                                    </Button>
                                                    <IconButton onClick={() => { handleClose; setSelectedResource(null); setEditMode(false); clearInputs(); }} edge={'start'} aria-label={'delete'}>
                                                        <Tooltip title='Cancel' placement='top' arrow>
                                                            <CloseIcon />
                                                        </Tooltip>
                                                    </IconButton>
                                                </> :
                                                // if not show this
                                                <Tooltip title="Mark as completed">
                                                    <Button sx={{ color: 'black' }} onClick={() => putResource(resource, true)}>
                                                        <ListItemText >{resource.completed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}</ListItemText>
                                                    </Button>
                                                </Tooltip>}
                                            {editMode && selectedResource === resource.id ?
                                                <IconButton color='primary' onClick={() => { putResource(resource, false); setEditMode(false); }}>
                                                    <SaveIcon />
                                                </IconButton> :
                                                <IconButton color='primary' onClick={() => { setEditMode(true); setSelectedResource(resource.id); }} aria-label={'delete'}>
                                                    <ModeEditIcon />
                                                </IconButton>}

                                        </ListItem>
                                    </List>
                                    <AnimatePresence>
                                        {/* if edit mode is on and the selected resource state is the same as the id clicked on */}
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
