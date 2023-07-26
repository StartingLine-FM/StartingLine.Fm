import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, React } from 'react';
import {
    Typography, Container, Paper, ListSubheader, Button, List, ListItemButton,
    ListItemText, ListItemIcon, ListItem, IconButton, Modal, Box, Dialog, DialogContent, DialogTitle
} from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AnimatePresence, motion } from 'framer-motion';
import ToDoListModal from './ToDoListModal';


export default function ToDoList() {


    // set state for selected resource
    const [selectedResource, setSelectedResource] = useState(null);
    // set modal state
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpen = () => {
        setIsModalOpen(true);
    }

    const handleClose = () => {
        setIsModalOpen(false);
    }
    // init dispatch
    const dispatch = useDispatch();

    // grab titles from the title reducer
    const list_titles = useSelector(store => store.tableListReducer);
    // grab reesources from the store
    const title_resources = useSelector(store => store.todoListResourcesReducer);
    console.log(title_resources);



    useEffect(() => {
        dispatch({ type: "FETCH_TABLE_LISTS" })
    }, [])

    return (
        <>
            <Container sx={{ flexDirection: 'row', display: 'flex', alignContent: 'center', justifyContent: 'center', maxWidth: '100%' }}>
                <Container sx={{ paddingBottom: 4, flexDirection: 'column', display: 'flex', alignContent: 'center', justifyContent: 'center', maxWidth: '100%' }}>
                    <Typography variant='h4' gutterBottom align='center' paddingBottom={4}>Todo Lists</Typography>
                    <Paper sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', width: '100%' }} elevation={2}>
                        <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                            {list_titles.map((list, i) => (
                                <ListItem key={i} secondaryAction={
                                    <IconButton edge={'end'} aria-label={'delete'}>
                                        <DeleteIcon />
                                    </IconButton>
                                }>
                                    <ListItemButton onClick={() => dispatch({ type: "FETCH_TODO_LIST_RESOURCES", payload: list.id })} key={i}>
                                        <ListItemText variant='h4' >{list.title}</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Container>
            </Container>
            <Container sx={{ flexDirection: 'column', display: 'flex', alignContent: 'center', justifyContent: 'center', maxWidth: '100%' }}>
                <Typography variant='h4' gutterBottom align='center' paddingBottom={4}>Resources</Typography>
                <Paper sx={{ flexDirection: 'column', display: 'flex', alignContent: 'center', justifyContent: 'center', width: '100%' }} elevation={2}>
                    {title_resources.map((resource, i) => (
                        <Container key={resource.id}>
                            <List
                                sx={{ display: 'flex', flexDirection: 'row', width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                                <ListItem secondaryAction={<IconButton onClick={() => dispatch({ type: "DELETE_TODO_LIST_RESOURCE", payload: {id: resource.id, title_table_id: resource.title_table_id }})} edge={'end'} aria-label={'delete'}>
                                    <DeleteIcon />
                                </IconButton>} >
                                    <ListItemButton key={resource.id} onClick={() => { setSelectedResource(resource.id); handleOpen(); }}>
                                        <ListItemText  >{resource.resource_name}</ListItemText>
                                        <ListItemText>{resource.notes}</ListItemText>
                                        <ListItemText >{resource.completed ? 'Completed' : 'Incomplete'}</ListItemText>
                                    </ListItemButton  >
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
        </>
    );
}
