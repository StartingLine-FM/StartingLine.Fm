import { useDispatch } from "react-redux";
import { useState } from "react";
// framer motion imports
// import { motion } from 'framer-motion'
// material ui imports 
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Button, DialogActions } from "@mui/material";
import TextField from '@mui/material/TextField';

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
export default function ToDoListModal({ isModalOpen, handleOpen, handleClose, resource, setSelectedResource, selectedResource }) {
    // set local state
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState('');
    const [newCompleted, setNewCompleted] = useState(false);
    const [newNotes, setNewNotes] = useState('');

    console.log(resource)
    // init dispatch
    const dispatch = useDispatch();
    // update a resource
    const putResource = () => {
        let name;
        let notes;
        let completed = false;
        let title_table_id = resource.title_table_id;
        let id = resource.resource_id;
        let todo_id = resource.id

        newName ? name = newName : name = resource.resource_name;
        newNotes ? notes = newNotes : notes = resource.notes;
        // logic for completed
        if (newCompleted === false) {
            completed = false;
          } else {
            completed = newCompleted;
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
        
        handleClose;
    }

    // clear inputs
    const clearInputs = () => {
        setNewName('');
        setNewNotes('');
        setNewCompleted(false);
    }

    return (
        <>
            {editMode ?
                <>
                    <Dialog open={isModalOpen} onClose={handleClose}  aria-labelledby='modal-modal-title'
                        aria-describedby='modal-modal-description'>
                        <DialogActions>
                            <IconButton edge='end' onClick={() => {putResource();}}>
                                <SaveIcon />
                            </IconButton>
                            <IconButton onClick={() => { setSelectedResource(null); setEditMode(false); clearInputs(); }} edge={'end'} aria-label={'delete'}>
                                <CloseIcon />
                            </IconButton>
                            <DialogTitle variant='h5'>{resource.resource_name}</DialogTitle>
                        </DialogActions>
                        <DialogContent sx={{ gap: 2, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                            <TextField onChange={(e) => setNewNotes(e.target.value)} variant='outlined' placeholder={resource.notes} value={newNotes}></TextField>
                            <Button
                                variant='text'
                                onClick={() => setNewCompleted((prevCompleted) => !prevCompleted)}
                            >Check if Completed
                                {newCompleted ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                            </Button></DialogContent>
                    </Dialog>
                </> :
                <Dialog open={isModalOpen} onClose={handleClose} >
                    <DialogActions>
                        <IconButton onClick={() => { handleClose;  setSelectedResource(null); setEditMode(false);clearInputs();  }} edge={'start'} aria-label={'delete'}>
                            <CloseIcon />
                        </IconButton>
                        <IconButton onClick={() => setEditMode(true)} edge={'end'} aria-label={'delete'}>
                            <ModeEditIcon />
                        </IconButton>
                    </DialogActions>
                    <DialogTitle variant='h5'>{resource.resource_name}</DialogTitle>
                    <DialogContent sx={{ gap: 2, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                        {resource.notes &&
                            <Typography variant='body1'>Notes: {resource.notes}</Typography>}
                        {resource.resource_description &&
                            <Typography variant='body1'>Description: {resource.resource_description}</Typography>}
                        {resource.email &&
                            <Typography variant='body1'>Email: {resource.email}</Typography>}
                        {resource.linkedin &&
                            <Typography variant='body1'>LinkedIn: {resource.linkedin}</Typography>}
                        {resource.website && <Typography variant='body1'>Website: {resource.website}</Typography>}
                        {resource.website && <Typography variant='body1'>Website: {resource.website}</Typography>}
                            <Typography>Completed :{newCompleted ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />} </Typography>
                    </DialogContent>
                </Dialog>
            }
        </>
    )
}