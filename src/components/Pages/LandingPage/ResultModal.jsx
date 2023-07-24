// hook imports
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// MUI
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    TextField,
    IconButton,
    Link
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

export default function ResultModal({ open, handleClose, result }) {

    // local state
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState('')
    const [newImage, setNewImage] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newWebsite, setNewWebsite] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newAddress, setNewAddress] = useState('')
    const [newLinkedIn, setNewLinkedIn] = useState('')
    const [newCategory, setNewCategory] = useState('')
    const [newStage, setNewStage] = useState('')

    // Redux
    const user = useSelector(store => store.user);
    const todoResources = useSelector(store => store.todoListResourcesReducer);
    const todoList = useSelector(store => store.todoListReducer);
    const dispatch = useDispatch();

    // click handler for saving our admin edit changes
    const putResource = () => {
        // instantiate payload keys
        let name;
        let image;
        let description;
        let website;
        let email;
        let address;
        let linkedin;
        let category_id;
        let stage_id;

        // if there's a change made, send the changed data, else send existing data
        newName ? name = newName : name = result.name;
        newImage ? image = newImage : image = result.image;
        newDescription ? description = newDescription : description = result.description;
        newWebsite ? website = newWebsite : website = result.website;
        newLinkedIn ? linkedin = newLinkedIn : linkedin = result.linkedin;
        newEmail ? email = newEmail : email = result.email;
        newAddress ? address = newAddress : address = result.address;
        newCategory ? category_id = newCategory : category_id = result.category_id;
        newStage ? stage_id = newStage : stage_id = result.stage_id;

        // send dispatch to update resource
        dispatch({
            type: "UPDATE_RESOURCE",
            payload: {
                id: result.id,
                name,
                image,
                description,
                website,
                email,
                address,
                linkedin,
                category_id,
                stage_id
            }
        })

        // clear all inputs
        clearInputs();

        // close dialog box
        handleClose();
    }

    // function to clear state for all admin edit fields
    const clearInputs = () => {
        setNewName('');
        setNewImage('');
        setNewDescription('');
        setNewWebsite('');
        setNewEmail('');
        setNewAddress('');
        setNewLinkedIn('');
        setNewCategory('');
        setNewStage('');
        setEditMode(false);
    }

    // click handler for admin to delete a resource
    const deleteResource = () => {

        dispatch({
            type: "DELETE_RESOURCE",
            payload: result.id
        })

        // close dialog
        handleClose();
    }

    return (
        result
            ? editMode
                // If in Edit Mode, show the following:
                ? <Dialog open={open} onClose={handleClose}>
                    <DialogActions>
                        <IconButton onClick={putResource} >
                            <SaveIcon />
                        </IconButton>
                        <IconButton onClick={() => { handleClose(), clearInputs() }} >
                            <CloseIcon />
                        </IconButton>
                    </DialogActions>
                    <DialogTitle>Edit entry for {result.name}</DialogTitle>
                    <DialogContent>
                        <TextField
                            placeholder={result.name}
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                        <TextField
                            placeholder={result.description ? result.description : 'Add description'}
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            multiline
                            rows={5}
                            maxLength="1000"
                        />
                        <TextField
                            placeholder={result.website ? result.website : 'Add website url'}
                            value={newWebsite}
                            onChange={(e) => setNewWebsite(e.target.value)}
                        />
                        <TextField
                            placeholder={result.email ? result.email : 'Add email'}
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <TextField
                            placeholder={result.linkedin ? result.linkedin : 'Add LinkedIn url'}
                            value={newLinkedIn}
                            onChange={(e) => setNewLinkedIn(e.target.value)}
                        />
                        <TextField
                            placeholder={result.address ? result.address : 'Add address'}
                            value={newAddress}
                            onChange={(e) => setNewAddress(e.target.value)}
                        />
                        <TextField
                            placeholder={result.image ? result.image : 'Add image url'}
                            value={newImage}
                            onChange={(e) => setNewImage(e.target.value)}
                        />
                    </DialogContent>
                </Dialog>
                // if NOT in edit mode, show as normal
                : <Dialog open={open} onClose={handleClose} >
                    <DialogActions>
                        {/* render Edit and Delete buttons if the user is logged in as admin */}
                        {user && user.admin
                            ? <>
                                <IconButton onClick={() => setEditMode(true)} >
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={deleteResource} >
                                    <DeleteIcon />
                                </IconButton>
                            </>
                            : <>
                                <IconButton >
                                    <StarBorderIcon />
                                </IconButton>
                            </>
                        }
                        <IconButton onClick={handleClose} >
                            <CloseIcon />
                        </IconButton>
                    </DialogActions>
                    <DialogTitle>{result.name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText >
                            {result.description}
                        </DialogContentText>
                        {result.website || result.linkedin || result.email || result.address &&
                            <DialogActions>
                                Contact:
                                <Link>{result.website && result.website}</Link>
                                <Link>{result.email && result.email}</Link>
                                <Link>{result.linkedin && result.linkedin}</Link>
                                {result.address && result.address}
                            </DialogActions>}
                    </DialogContent>
                </Dialog>
            : null
    )
}