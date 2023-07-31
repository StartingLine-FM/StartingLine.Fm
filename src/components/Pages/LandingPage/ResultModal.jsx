// hook imports
import { useState, useEffect } from "react";
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

export default function ResultModal({ open, handleClose, result, userPostTodo, anonPostTodo, stages, categories }) {

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
        editMode
            // If in Edit Mode, show the following:
            ? <Dialog open={open} onClose={handleClose} >
                <DialogActions>
                    <IconButton onClick={putResource} >
                        <SaveIcon />
                    </IconButton>
                    <IconButton onClick={() => { handleClose(), clearInputs() }} >
                        <CloseIcon />
                    </IconButton>
                </DialogActions>
                <DialogTitle>Edit entry for {result.name}</DialogTitle>
                <DialogContent sx={{ pt: 1, mt: 1 }}>
                    <TextField
                        sx={{ m: 1 }}
                        label={result.name}
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <TextField
                        sx={{ m: 1, width: "50%" }}
                        label={result.description ? result.description : 'Add description'}
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        multiline
                        rows={3}
                        maxLength="1000"
                    />
                    <TextField
                        sx={{ m: 1 }}
                        label={result.website ? result.website : 'Add website url'}
                        value={newWebsite}
                        onChange={(e) => setNewWebsite(e.target.value)}
                    />
                    <TextField
                        sx={{ m: 1 }}
                        label={result.email ? result.email : 'Add email'}
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <TextField
                        sx={{ m: 1 }}
                        label={result.linkedin ? result.linkedin : 'Add LinkedIn url'}
                        value={newLinkedIn}
                        onChange={(e) => setNewLinkedIn(e.target.value)}
                    />
                    <TextField
                        sx={{ m: 1 }}
                        label={result.address ? result.address : 'Add address'}
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                    />
                    <TextField
                        sx={{ m: 1 }}
                        label={result.image ? result.image : 'Add image url'}
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                    />
                    <TextField
                        sx={{ m: 1 }}
                        select
                        defaultValue={result.category_id}
                        SelectProps={{
                            native: true,
                        }}
                        label="Edit Category"
                        onChange={e => setNewCategory(e.target.value)}
                    >
                        <option value={0}>Add Category</option>
                        {categories && 
                        categories.map(cat => {
                            return (
                                <option value={cat.id}>{cat.name}</option>
                            );
                        })}

                    </TextField>
                    <br />
                    <TextField
                        sx={{ m: 1 }}
                        select
                        defaultValue={result.stage_id}
                        SelectProps={{
                            native: true,
                        }}
                        label="Edit Business Stage"
                        onChange={e => setNewStage(e.target.value)}
                    >   <option value={0}>Add Business Stage</option>
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
            : <Dialog open={open} onClose={handleClose}  >
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
                        : todoResources.some(e => e.id === result.id || e.resource_id === result.id)
                            ? <IconButton>
                                <CheckIcon color="primary" />
                            </IconButton>
                            : user.id
                                ? <IconButton onClick={() => userPostTodo()} >
                                    <AddIcon />
                                </IconButton>
                                : <IconButton onClick={() => anonPostTodo()}>
                                    <AddIcon />
                                </IconButton>

                    }
                    <IconButton onClick={handleClose} >
                        <CloseIcon />
                    </IconButton>
                </DialogActions>
                <DialogTitle>{result.name}</DialogTitle>
                <DialogContent sx={{ gap: 2, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                    <Typography variant="body1">{result.description}</Typography>
                    <Link target="_blank" rel="noopener noreferrer" href={result.website}>{result.website && result.website}</Link>
                    <Link href={`mailto:${result.email}`}>{result.email && result.email}</Link>
                    <Link target="_blank" rel="noopener noreferrer" href={result.linkedin}>{result.linkedin && result.linkedin}</Link>
                    <Typography variant="body1">{result.address && result.address}</Typography>
                    <DialogContentText>
                        <Chip color="primary" sx={{ mt: 2, mr: 1 }} label={result.category_name} />
                        <Chip color="secondary" sx={{ mt: 2 }} label={result.stage_name} />
                    </DialogContentText>
                </DialogContent>
            </Dialog>
    )
}