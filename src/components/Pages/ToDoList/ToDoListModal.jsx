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
export default function ToDoListModal({ isModalOpen, open, close, resource, setSelectedResource, selectedResource }) {
    // set local state
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newWebsite, setNewWebsite] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newCompleted, setNewCompleted] = useState(false);
    const [newLinkedin, setNewLinkedin] = useState('');
    const [newImage, setNewImage] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newNotes, setNewNotes] = useState('');


    // init dispatch
    const dispatch = useDispatch();
    // update a resource
    const putResource = () => {
        let name;
        let notes;
        let description;
        let email;
        let linkedin;
        let website;
        let image;
        let address;
        let completed;

        newName ? name = newName : name = resource.resource_name;
        newNotes ? notes = newNotes : notes = resource.notes;
        newDescription ? description = newDescription : description = resource.resource_description;
        newEmail ? email = newEmail : email = resource.email;
        newLinkedin ? linkedin = newLinkedin : linkedin = resource.linkedin;
        newWebsite ? website = newWebsite : website = resource.website;
        newCompleted ? completed = newCompleted : completed = resource.completed;
        newImage ? image = newImage : image = resource.image;
        newAddress ? address = newAddress : address = resource.address;


        // send off updated resource
        dispatch({
            type: 'PUT_TODO_LIST',
            payload: {
                title_table_id,
                id,
                name,
                notes,
                description,
                email,
                linkedin,
                website,
                image,
                address,
                completed
            }
        })

        // clear the inputs
        clearInputs();

        // close modal
        close();
    }

    // clear inputs
    const clearInputs = () => {
        setNewName('');
        setNewDescription('');
        setNewEmail('');
        setNewWebsite('');
        setNewNotes('');
        setNewAddress('');
        setNewLinkedin('');
        setNewCompleted('');
    }

    // toggle checked box logic
    const toggleHandler = () => {
        if (newCompleted === false) {
            return <CheckBoxOutlineBlankIcon />
        } else if (newCompleted === true) {
            return <CheckBoxIcon />
        }
    }

    return (
        <>
            <Dialog
                component={motion.div} open={open} close={close} aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                {editMode ?
                    <>
                        <DialogActions>
                            <IconButton onClick={() => { putResource }}>
                                <SaveIcon />
                            </IconButton>
                            <IconButton component={motion.button} onClick={() => { setSelectedResource(null); setEditMode(false); close(); clearInputs(); }} edge={'end'} aria-label={'delete'}>
                                <CloseIcon />
                            </IconButton>
                            <Button >Exit</Button>
                            <DialogTitle variant='h5'>{resource.resource_name}</DialogTitle>
                        </DialogActions>
                        <Typography variant='h5'>{resource.resource_name}</Typography>
                        <DialogContent sx={{ gap: 2, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                            {resource.notes &&
                                <TextField onChange={(e) => setNewNotes(e.target.value)} variant='outlined' placeholder={resource.notes} value={newNotes} />}
                            {resource.resource_description &&
                                <TextField onChange={(e) => setNewDescription(e.target.value)} variant='outlined' placeholder={resource.resource_description} value={newDescription} />}
                            {resource.email &&
                                <TextField onChange={(e) => setNewEmail(e.target.value)} variant='outlined' placeholder={resource.email} value={newEmail} />}
                            {resource.linkedin &&
                                <TextField onChange={(e) => setNewLinkedin(e.target.value)} variant='outlined' placeholder={resource.linkedin} value={newLinkedin} />}
                            {resource.website && <TextField variant='outlined' placeholder={resource.website} value={newWebsite} />}
                            {resource.image_url &&
                                <TextField onChange={(e) => setNewImage(e.target.value)} placeholder={resource.image_url} variant='outlined' value={newImage} />}
                            {resource.address &&
                                <TextField onChange={(e) => setNewAddress(e.target.value)} placeholder={resource.address} variant='outlined' value={newAddress} />}
                            <Button variant="text" onChange={(e) => setNewCompleted(e.target.value)} value={newCompleted}>{toggleHandler()}</Button>
                        </DialogContent>
                    </> :
                    <>
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
                            <IconButton onChange={(e) => setNewCompleted(e.target.value)} variant='body1' value={newCompleted}>
                                <Typography>Completed: <CheckBoxIcon /> </Typography>
                            </IconButton>
                            <IconButton onClick={() => setEditMode(true)} edge={'end'} aria-label={'delete'}>
                                <ModeEditIcon />
                            </IconButton>
                            <Button component={motion.button} onClick={() => { setSelectedResource(null); close(); }} >Exit</Button>
                        </DialogContent>
                    </>
                }
            </Dialog>
        </>
    )
}