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
import CloseIcon from '@mui/icons-material/Close';

export default function InfoModal({ infoOpen, handleInfoClose }) {
    return (
        <Dialog open={infoOpen} onClose={handleInfoClose} >
            <DialogActions>
                <IconButton onClick={handleInfoClose}>
                    <CloseIcon />
                </IconButton>
            </DialogActions>
            <DialogTitle>Categories and Business Stages</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: '10px' }}>
                        Categories:
                    </Typography>
                    <Typography variant="caption">
                        <ul>
                            <li><strong>Government:</strong> Resources from federal, state, and local governments that can assist startups in various ways.</li>
                            <li><strong>Funding:</strong> Sources of financial support for startups, including venture capitalists, angel investors, and grant programs.</li>
                            <li><strong>University:</strong> University-affiliated programs, incubators, or resources that can assist startups.</li>
                            <li><strong>Support:</strong> Organizations or platforms that offer support to startups, such as mentorship programs, networking organizations, coworking spaces, and incubators.</li>
                            <li><strong>Service Provider:</strong> Businesses that provide services that startups may need, such as legal services, marketing, business consulting, etc.</li>
                            <li><strong>Corporation:</strong> Large corporations that might provide partnerships, sponsorships, or resources for startups.</li>
                            <li><strong>Research:</strong> Research institutions or platforms that can provide startups with market, industry, or technological research.</li>
                        </ul>
                    </Typography>
                    <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: '10px' }}>
                        Stages:
                    </Typography>
                    <Typography variant="caption">
                        <ul>
                            <li><strong>All Stages:</strong> Resources that are applicable to startups at any stage in their life cycle.</li>
                            <li><strong>Nascent:</strong> Resources targeted towards ideas or businesses in the very early stages of development.</li>
                            <li><strong>Early:</strong> Resources for startups that have begun operations but are still in the early stages of their business life cycle.</li>
                            <li><strong>Startup/Seed:</strong> Resources for startups that are in the process of developing their product or service and likely looking for seed funding.</li>
                            <li><strong>Growth:</strong> Resources for startups that have a finished product or service and are looking to scale up their operations.</li>
                        </ul>
                    </Typography>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}