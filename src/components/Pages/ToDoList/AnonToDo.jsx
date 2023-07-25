import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    Typography,
    Container, Paper,
    ListSubheader,
    Button,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    ListItem,
    IconButton
} from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { AnimatePresence, motion } from 'framer-motion';
import './ToDoList.css'

export default function AnonToDo() {

    // set state for edit mode
    const [editMode, setEditMode] = useState(false)
    // set state for selected resource
    const [selectedResource, setSelectedResource] = useState(null);
    // set modal state
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Redux    
    const title_resources = useSelector(store => store.todoListResourcesReducer);

    return (
        <Container sx={{ flexDirection: 'column', display: 'flex', alignContent: 'center', justifyContent: 'center', maxWidth: '100%' }}>
            <Typography variant='h4' gutterBottom align='center' paddingBottom={4}>Resources</Typography>
            <Paper sx={{ flexDirection: 'column', display: 'flex', alignContent: 'center', justifyContent: 'center', width: '100%' }} elevation={2}>
                {title_resources.map((resource, i) => (
                    <>
                        <List component={motion.div} layoutId={resource.id} sx={{ display: 'flex', flexDirection: 'row', width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                            {/* TODO change backend to get the table title id in the resources */}
                            <ListItem component={motion.div} onClick={() => { setSelectedResource(title_resources[i]); setIsModalOpen(true) }}>
                                <ListItemText component={motion.h4}>{resource.name}</ListItemText>
                            </ListItem>
                            <ListItem>
                                {resource.notes
                                    ? <ListItemText component={motion.h4}>{resource.notes}</ListItemText>
                                    : <ListItemText component={motion.h4}><em>Edit to add notes</em></ListItemText>
                                }
                            </ListItem>
                            <ListItem component={motion.h5} secondaryAction={
                                <IconButton onClick={() => {setEditMode(true); setSelectedResource(title_resources[i]); setIsModalOpen(true)}} edge={'end'} aria-label={'delete'}>
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
                                                {resource.name && <ListItem component={motion.div}>
                                                    <ListItemText component={motion.h4}>{resource.name}</ListItemText>
                                                </ListItem>}
                                                {resource.notes
                                                    ? <ListItem component={motion.div}>
                                                        <ListItemText component={motion.h4}>Edit to add notes</ListItemText>
                                                    </ListItem>
                                                    : <ListItem component={motion.div}>
                                                        <ListItemText component={motion.h4}>{resource.notes}</ListItemText>
                                                    </ListItem>
                                                }
                                                {resource.description && <ListItem component={motion.div}>
                                                    <ListItemText component={motion.h4}>{resource.description}</ListItemText>
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
                                                <Button component={motion.button} onClick={() => { setSelectedResource(null); setIsModalOpen(false) }}>Exit</Button>
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
    )
}