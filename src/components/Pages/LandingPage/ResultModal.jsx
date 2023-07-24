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
import DeleteIcon from '@mui/icons-material/Delete';

export default function ResultModal({ open, handleClose, result }) {

    // local state
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState(result.name)
    const [newImage, setNewImage] = useState(result.image)
    const [newDescription, setNewDescription] = useState(result.description)
    const [newWebsite, setNewWebsite] = useState(result.website)
    const [newEmail, setNewEmail] = useState(result.email)
    const [newAddress, setNewAddress] = useState(result.address)
    const [newLinkedIn, setNewLinkedIn] = useState(result.linkedin)
    const [newCategory, setNewCategory] = useState("")
    const [newStage, setNewStage] = useState("")

    // Redux store
    const user = useSelector(store => store.user)
    const dispatch = useDispatch();


    return (
        result
        ? user
            ? user.admin && result
                ? editMode
                    ? <Dialog open={open} onClose={handleClose} >
                        <DialogTitle>Edit entry for {result.name}</DialogTitle>
                        <TextField />
                        <TextField />
                        <TextField />
                        <TextField />
                        <TextField />
                        <TextField />
                        <TextField />
                    </Dialog>
                    : <Dialog open={open} onClose={handleClose} >
                        <DialogTitle>{result.name}</DialogTitle>
                        <DialogContent>
                            <DialogContentText >
                                {result.description}
                            </DialogContentText>
                            {result.website || result.linkedin || result.email || result.address &&
                            <DialogActions>
                                Contact:
                            </DialogActions>}
                        </DialogContent>
                    </Dialog>

                : <Dialog open={open} onClose={handleClose} >
                    <DialogTitle>{result.name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText >
                            {result.description && result.description}
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
            : <Dialog open={open} onClose={handleClose} >
                <DialogTitle>{result.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        {result.description && result.description}
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