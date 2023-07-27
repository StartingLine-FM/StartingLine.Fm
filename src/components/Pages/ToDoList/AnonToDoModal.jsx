// framer motion imports
import { motion } from 'framer-motion'
// material ui imports 
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, DialogActions } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function AnonToDoModal({ open, resource, handleClose }) {

    return (

                <Dialog open={open} onClose={handleClose} >
                    <DialogActions>
                        <IconButton component={motion.button} onClick={handleClose} edge={'start'} aria-label={'delete'}>
                            <CloseIcon />
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
                    </DialogContent>
                </Dialog>
    )
}