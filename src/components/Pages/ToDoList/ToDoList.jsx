import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Typography, Container, Paper, ListSubheader, Button, List, ListItemButton, ListItemText, ListItemIcon, ListItem, IconButton } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AnimatePresence, motion } from 'framer-motion';
import './ToDoList.css'

export default function ToDoList() {

    // set state for edit mode
    const [editMode, setEditMode] = useState(false)
    // set state for selected resource
    const [selectedResource, setSelectedResource] = useState(null);
    // set modal state
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                                <>
                                    <ListItem secondaryAction={
                                        <IconButton edge={'end'} aria-label={'delete'}>
                                            <DeleteIcon />
                                        </IconButton>
                                    }>
                                        <ListItemButton onClick={() => dispatch({ type: "FETCH_TODO_LIST_RESOURCES", payload: list.id })} key={i}>
                                            <ListItemText key={i} variant='h4' >{list.title}</ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                </>
                            ))}
                        </List>
                    </Paper>
                </Container>
            </Container>
            <Container sx={{ flexDirection: 'column', display: 'flex', alignContent: 'center', justifyContent: 'center', maxWidth: '100%' }}>
                <Typography variant='h4' gutterBottom align='center' paddingBottom={4}>Resources</Typography>
                <Paper sx={{ flexDirection: 'column', display: 'flex', alignContent: 'center', justifyContent: 'center', width: '100%' }} elevation={2}>
                    {title_resources.map((resource, i) => (
                        <>
                            <List component={motion.div} layoutId={resource.id} sx={{ display: 'flex', flexDirection: 'row', width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                                {/* TODO change backend to get the table title id in the resources */}
                                <ListItem component={motion.div} onClick={() => {setSelectedResource(resource.id); setIsModalOpen(true)}}>
                                    <ListItemText component={motion.h4}>{resource.resource_name}</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText component={motion.h4}>{resource.notes}</ListItemText>
                                </ListItem>
                                <ListItem component={motion.h5} secondaryAction={
                                    <IconButton onClick={() => setEditMode(true)} edge={'end'} aria-label={'delete'}>
                                        <ModeEditIcon />
                                    </IconButton>
                                }>
                                    <ListItemText component={motion.h5}>{resource.completed ? 'Completed' : 'Incomplete'}</ListItemText>
                                </ListItem >
                            </List>
                            <AnimatePresence>
                                        {selectedResource && isModalOpen && (
                                            <>
                                <motion.div className='modal-overlay'>
                                                <motion.div initial={{ y: 50, opacity: 0 }}
                                                    animate={{
                                                        y: 0,
                                                        opacity: 1
                                                    }}
                                                    exit={{
                                                        y: -50,
                                                        opacity: 0
                                                    }}
                                                    transition={{ type: "spring", bounce: 0, duration: 0.4 }} component={motion.div} layoutId={resource.id} className='modal-content'>
                                                    <List sx={{ display: 'flex', flexDirection: 'row', width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                                                        {resource.resource_name && <ListItem component={motion.div}>
                                                            <ListItemText component={motion.h4}>{resource.resource_name}</ListItemText>
                                                        </ListItem>}
                                                        {resource.notes && <ListItem component={motion.div}>
                                                            <ListItemText component={motion.h4}>{resource.notes}</ListItemText>
                                                        </ListItem>}
                                                        {resource.resource_description && <ListItem component={motion.div}>
                                                            <ListItemText component={motion.h4}>{resource.resource_description}</ListItemText>
                                                        </ListItem>}
                                                        {resource.email && <ListItem component={motion.div}>
                                                            <ListItemText component={motion.h4}>{resource.email}</ListItemText>
                                                        </ListItem>}
                                                        {resource.linkedin && <ListItem component={motion.div}>
                                                            <ListItemText component={motion.h4}>{resource.linkedin}</ListItemText>
                                                        </ListItem>}
                                                        {resource.website && <ListItem component={motion.div}>
                                                            <ListItemText component={motion.h4}>{resource.website}</ListItemText>
                                                        </ListItem>}
                                                        {resource.completed ? <ListItem component={motion.div}>
                                                            <ListItemText component={motion.h4}>Completed</ListItemText>
                                                        </ListItem> : <ListItem component={motion.div}>
                                                            <ListItemText component={motion.h4}>Incomplete</ListItemText>
                                                        </ListItem>}
                                                        <ListItem component={motion.h5} secondaryAction={
                                                            <IconButton onClick={() => setEditMode(true)} edge={'end'} aria-label={'delete'}>
                                                                <ModeEditIcon />
                                                            </IconButton>
                                                        }></ListItem>
                                                        <Button component={motion.button} onClick={() => {setSelectedResource(null); setIsModalOpen(false)}}>Exit</Button>
                                                    </List>
                                                </motion.div>
                                    </motion.div>
                                            </>
                                        )
                                        }

                            </AnimatePresence>
                        </>
                    ))}
                </Paper>
            </Container>

        </>
    );
}
