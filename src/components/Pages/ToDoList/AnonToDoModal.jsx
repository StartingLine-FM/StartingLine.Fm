import { useDispatch } from "react-redux";
import { useState } from "react";
// framer motion imports
import { motion } from 'framer-motion'
// material ui imports 
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Button, DialogActions } from "@mui/material";
import TextField from '@mui/material/TextField';

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function AnonToDoModal({ open, resource, setSelectedResource, handleClose }) {

    // set local state
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState('');
    const [newCompleted, setNewCompleted] = useState(false);
    const [newNotes, setNewNotes] = useState('');


    // init dispatch
    const dispatch = useDispatch();
    // update a resource
    const putResource = () => {
        let name;
        let notes;
        let completed = false;

        newName ? name = newName : name = resource.name;
        newNotes ? notes = newNotes : notes = resource.notes;
        newCompleted ? completed = newCompleted : completed = resource.completed;

        console.log(resource, name, notes, completed)

        // send off updated resource
        // TODO check the payload
        dispatch({
            type: 'PUT_ANON_TODO_LIST',
            payload: {
                id: resource.id,
                name,
                notes,
                completed
            }
        })

        // clear the inputs
        clearInputs();

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
                    <Dialog component={motion.div} open={open} onClose={handleClose} aria-labelledby='modal-modal-title'
                        aria-describedby='modal-modal-description' >
                        <DialogActions>
                            <IconButton edge='end' onClick={() => { putResource() }}>
                                <SaveIcon />
                            </IconButton>
                            <IconButton component={motion.button} onClick={() => { handleClose(); clearInputs(); }} edge={'end'} aria-label={'delete'}>
                                <CloseIcon />
                            </IconButton>
                            <DialogTitle variant='h5'>{resource.name}</DialogTitle>
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
                <Dialog open={open} onClose={handleClose} >
                    <DialogActions>
                        <IconButton component={motion.button} onClick={() => { setSelectedResource(null); setEditMode(false); close; clearInputs(); }} edge={'start'} aria-label={'delete'}>
                            <CloseIcon />
                        </IconButton>
                        <IconButton onClick={() => setEditMode(true)} edge={'end'} aria-label={'delete'}>
                            <ModeEditIcon />
                        </IconButton>
                    </DialogActions>
                    <DialogTitle variant='h5'>{resource.name}</DialogTitle>
                    <DialogContent sx={{ gap: 2, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                        {resource.notes &&
                            <Typography variant='body1'>Notes: {resource.notes}</Typography>}
                        {resource.description &&
                            <Typography variant='body1'>Description: {resource.description}</Typography>}
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