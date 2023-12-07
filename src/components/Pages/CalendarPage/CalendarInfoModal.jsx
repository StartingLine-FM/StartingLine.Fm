import React from 'react'
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

const CalendarInfoModal = ({ calendarInfoOpen, handleCalendarInfoClose }) => {
    return (
        <Dialog open={calendarInfoOpen} onClose={handleCalendarInfoClose} >
            <DialogActions>
                <IconButton onClick={handleCalendarInfoClose}>
                    <CloseIcon />
                </IconButton>
            </DialogActions>
            <DialogTitle>StartingLine.FM Calendar Guide</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: '10px' }}>
                        About:
                    </Typography>
                    <Typography variant="caption">
                        <ul>
                            <li>This calendar will appear blank until you select at least one institution from the menu.</li>
                            <li>This is a four-in-one calendar that tracks the event calendars of these institutions.</li>
                            <li><strong>1. NDSU CEFB:</strong> North Dakota State University Center for Entrepreneurship and Family Business. An Office within NDSU that seeks to inspire and train future generations of entrepreneurs.</li>
                            <li><strong>2. Emerging Prairie:</strong> A business located in downtown Fargo that seeks to serve community members interested in being a part of the entrepreneurial community focused on startups, technology and innovation, along with those interested in learning about it. </li>
                            <li><strong>3. Fargo Underground:</strong> Launched in 2004 by a small group of locals who who wanted to promote the fine dining, nightlife, art, and live music happening in Fargo-Moorhead. They know the secret spots and hidden gems that make a visit to Fargo and Moorhead so special.</li>
                            <li><strong>4. FMWF Chamber:</strong> Fargo Moorhead West Fargo Chamber of Commerce. The Chamber seeks to protect and promote business, inspire individuals, cultivate communities and influence action.</li>
                            <li>Clicking an institution button will toggle that organizations events on or off within this calendar. The Clear button will toggle all institutions off.</li>
                            <li>Each institution and event is color coordinated. The color of the button and the colored dot of the event will match.</li>
                            <li>Clicking an event will open a new tab with a Google Calendar event preloaded. You can then add it to your own Google Calendar.</li>
                        </ul>
                    </Typography>
                    <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: '10px' }}>
                        Sources:
                    </Typography>
                    <Typography variant="caption">
                        <ul>
                            <a href="https://ndsu-cefb.com/events/list/" target="_blank"><li><strong>NDSU CEFB Calendar</strong> </li></a>
                            <a href="https://www.emergingprairie.com/calendar/" target="_blank"><li><strong>Emerging Prairie Calendar</strong></li></a>
                            <a href="https://fargounderground.com/events/category/community/business/list/" target="_blank"><li><strong>Fargo Undergound Calendar</strong> </li></a>
                            <a href="https://www.fmwfchamber.com/events/catgid/6?" target="_blank"><li><strong>FMWF Chamber Calendar</strong> </li></a>
                            <li><strong>Technical note:</strong> Calendars are scanned every hour from 8 am to 6 pm on weekdays.</li>
                        </ul>
                    </Typography>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

export default CalendarInfoModal
