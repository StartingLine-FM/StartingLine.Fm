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
    IconButton
} from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// framer
import { AnimatePresence, motion } from 'framer-motion';

// other components
import './ToDoList.css'
import AnonToDoModal from './AnonToDoModal';

export default function AnonToDo() {

    // set state for edit mode
    const [editMode, setEditMode] = useState(false)
    // set state for selected resource
    const [selectedResource, setSelectedResource] = useState(null);
    // set modal state
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setSelectedResource(null);
    }

    const deleteResource = (id) => {
        dispatch({
            type: 'DELETE_ANON_TODO_LIST',
            payload: id
        })
    }

    // Redux    
    const title_resources = useSelector(store => store.todoListResourcesReducer);
    const dispatch = useDispatch();

    return (
        <Container sx={{ flexDirection: 'column', display: 'flex', alignContent: 'center', justifyContent: 'center', maxWidth: '100%' }}>
            <Typography variant='h4' gutterBottom align='center' paddingBottom={4}>Resources</Typography>

            { title_resources &&
            title_resources.map((resource, i) => (
                <Paper key={i} sx={{ flexDirection: 'column', display: 'flex', alignContent: 'center', justifyContent: 'center', width: '100%' }} elevation={2}>
                    <List sx={{ display: 'flex', flexDirection: 'row', width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                        <ListItem >
                            <ListItemText component={motion.h4}>{resource.name}</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText component={motion.h4}>{resource.notes}</ListItemText>
                        </ListItem>

                        <ListItem>
                            <ListItemText >{resource.completed ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}</ListItemText>
                        </ListItem >
                        <ListItem sx={{ width: 100 }}>
                            <IconButton onClick={() => { setSelectedResource(resource.id); setOpen(true); }}>
                                <ModeEditIcon />
                            </IconButton>
                        </ListItem>
                        <ListItem sx={{ width: 100 }}>
                            <IconButton onClick={() => deleteResource(resource.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
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
                </Paper>
            ))}

        </Container>
    )
}