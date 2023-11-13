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
    Link,
    Chip,
} from '@mui/material';
// MUI Icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

export default function ResultModal({ open, handleClose, hit, userPostTodo, anonPostTodo, stages, categories }) {

    // local state
    // admin edit state
    const [editMode, setEditMode] = useState(false);
    // resource keys for admin edit
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
    const dispatch = useDispatch();

    // click handler for saving our admin edit changes
    const putResource = () => {
        // instantiate payload keys
        let name;
        let image_url;
        let description;
        let website;
        let email;
        let address;
        let linkedin;
        let category_id;
        let stage_id;

        // if there's a change made, send the changed data, else send existing data
        newName ? name = newName : name = hit.name;
        newImage ? image_url = newImage : image_url = hit.image_url;
        newDescription ? description = newDescription : description = hit.description;
        newWebsite ? website = newWebsite : website = hit.website;
        newLinkedIn ? linkedin = newLinkedIn : linkedin = hit.linkedin;
        newEmail ? email = newEmail : email = hit.email;
        newAddress ? address = newAddress : address = hit.address;
        newCategory ? category_id = newCategory : category_id = hit.category_id;
        newStage ? stage_id = newStage : stage_id = hit.stage_id;

        // send dispatch to update resource
        dispatch({
            type: "UPDATE_RESOURCE",
            payload: {
                id: hit.id,
                name,
                image_url,
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
            payload: hit.id
        })

        // close dialog
        handleClose();
    }

    return (
        editMode
            // If in Edit Mode, show the following:
            ? <Dialog open={open} onClose={handleClose} >
                {/* Save and Close buttons */}
                <DialogActions>
                    <IconButton onClick={putResource} >
                        <SaveIcon />
                    </IconButton>
                    <IconButton onClick={() => { handleClose(), clearInputs() }} >
                        <CloseIcon />
                    </IconButton>
                </DialogActions>
                {/* Text fields for edit mode */}
                <DialogTitle>Edit entry for {hit.name}</DialogTitle>
                <DialogContent sx={{ pt: 1, mt: 1 }}>
                    {/* Name edit: set to populate current Name to be edited */}
                    <TextField
                        label="Edit Name"
                        sx={{ m: 1 }}
                        value={newName || hit.name}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    {/* Description edit: set to populate current Description to be edited */}
                    <TextField
                        sx={{ m: 1, width: "50%" }}
                        label={hit.description ? "Edit Description" : 'Add description'}
                        value={newDescription || hit.description}
                        onChange={(e) => setNewDescription(e.target.value)}
                        multiline
                        rows={3}
                        maxLength="1000"
                    />
                    <TextField
                        sx={{ m: 1 }}
                        label={hit.website ? "Edit Website" : 'Add website url'}
                        value={newWebsite || hit.website}
                        onChange={(e) => setNewWebsite(e.target.value)}
                    />
                    <TextField
                        sx={{ m: 1 }}
                        label={hit.email ? "Edit Email" : 'Add email'}
                        value={newEmail || hit.email}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <TextField
                        sx={{ m: 1 }}
                        label={hit.linkedin ? "Edit LinkedIn" : 'Add LinkedIn url'}
                        value={newLinkedIn || hit.linkedin}
                        onChange={(e) => setNewLinkedIn(e.target.value)}
                    />
                    <TextField
                        sx={{ m: 1 }}
                        label={hit.address ? "Edit Address" : 'Add address'}
                        value={newAddress || hit.address}
                        onChange={(e) => setNewAddress(e.target.value)}
                    />
                    {/* Image URL is the only field that doesn't populate the current value by default,
                    mostly because this is the only text input where the user would more likely to be replacing
                    the whole input instead of just editing parts of it */}
                    <TextField
                        sx={{ m: 1 }}
                        label={hit.image_url ? hit.image_url : 'Add Image URL'}
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                    />
                    {/* Category edit dropdown */}
                    <TextField
                        sx={{ m: 1 }}
                        select
                        defaultValue={hit.category_id}
                        SelectProps={{
                            native: true,
                        }}
                        label="Edit Category"
                        onChange={e => setNewCategory(e.target.value)}
                    >
                        {organizations &&
                            organizations.map(cat => {
                                return (
                                    <option value={cat.id}>{cat.name}</option>
                                );
                            })}

                    </TextField>
                    <br />
                    {/* Stage edit dropdown */}
                    <TextField
                        sx={{ m: 1 }}
                        select
                        defaultValue={hit.stage_id}
                        SelectProps={{
                            native: true,
                        }}
                        label="Edit Business Stage"
                        onChange={e => setNewStage(e.target.value)}>
                        {stages &&
                            stages.map(s => {
                                return (
                                    <option value={s.id}>{s.name}</option>
                                );
                            })}
                    </TextField>
                </DialogContent>
            </Dialog>
            // if NOT in edit mode, show as normal
            :
            <Dialog open={open} onClose={handleClose}  >
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
                        // checks if current to-do list contains this resource
                        : todoResources.some(e => e.id === hit.id || e.resource_id === hit.id)
                            // if on the current list, renders a checkmark
                            ? <IconButton>
                                <CheckIcon color="primary" />
                            </IconButton>
                            : user.id
                                // else if not on todo list, onClick for Add Button changes depending on user's logged-in status
                                ? <IconButton onClick={() => userPostTodo()} >
                                    <AddIcon />
                                </IconButton>
                                : <IconButton onClick={() => anonPostTodo()}>
                                    <AddIcon />
                                </IconButton>

                    }
                    {/* Closes modal */}
                    <IconButton onClick={handleClose} >
                        <CloseIcon />
                    </IconButton>
                </DialogActions>
                {/* Title and content display */}
                <DialogTitle>{hit.name}</DialogTitle>
                {hit.image_url &&
                    <div style={{ padding: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px', overflow: 'hidden' }}>
                        <img style={{ display: 'block', maxWidth: '100%', maxHeight: '250px' }} src={hit.image_url} alt={hit.name} />
                    </div>
                }
                <DialogContent sx={{ gap: 2, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                    <Typography variant="body1">{hit.description}</Typography>
                    <Link target="_blank" rel="noopener noreferrer" href={hit.website}>{hit.website && hit.website}</Link>
                    <Link href={`mailto:${hit.email}`}>{hit.email && hit.email}</Link>
                    <Link target="_blank" rel="noopener noreferrer" href={hit.linkedin}>{hit.linkedin && hit.linkedin}</Link>
                    <Typography variant="body1">{hit.address && hit.address}</Typography>
                    <DialogContentText>
                        <Chip color="primary" sx={{ mt: 2, mr: 1 }} label={hit.organization_name} />
                        <Chip color="secondary" sx={{ mt: 2 }} label={hit.stage_name} />
                    </DialogContentText>
                </DialogContent>
            </Dialog>
    )
}