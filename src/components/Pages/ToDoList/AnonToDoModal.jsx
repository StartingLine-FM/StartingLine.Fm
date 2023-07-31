// material ui imports 
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    IconButton,
    DialogActions,
    Link
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function AnonToDoModal({ open, resource, handleClose }) {

    return (

        <Dialog open={open} onClose={handleClose} >
            <DialogActions>
                <IconButton onClick={handleClose} edge={'start'} aria-label={'delete'}>
                    <CloseIcon />
                </IconButton>
            </DialogActions>
            <DialogTitle variant='h5'>{resource.name}</DialogTitle>
            <DialogContent sx={{ gap: 2, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                {resource.notes &&
                    <Typography variant='body1'>Notes: {resource.notes}</Typography>}
                {resource.description &&
                    <Typography variant='body1'>Description: {resource.description}</Typography>}
                <Link target="_blank" rel="noopener noreferrer" href={resource.website}>{resource.website && resource.website}</Link>
                <Link href={`mailto:${resource.email}`}>{resource.email && resource.email}</Link>
                <Link target="_blank" rel="noopener noreferrer" href={resource.linkedin}>{resource.linkedin && resource.linkedin}</Link>
                <Typography variant="body1">{resource.address && resource.address}</Typography>
            </DialogContent>
        </Dialog>
    )
}