import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// material ui imports
import { Typography, Container, Paper } from '@mui/material/';
import SaveIcon from '@mui/icons-material/Save'; // save icon
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; // copy icon
import ModeEditIcon from '@mui/icons-material/ModeEdit'; // edit icon
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'; // delete icon
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// TODO: bring in resources by going back and changing those things on the backend
// TODO: map over resources by inserting a mock todo list so we having something to go off of 
// TODO: condiitonally render for users vs gloabl user

export default function ToDoList() {
    const dispatch = useDispatch();
    // use effect to rerender the page whenever the list chagnes
    useEffect(() => {
        dispatch({ type: "FETCH_TODO_LIST_RESOURCES" });
    }, [])
    // init use selector to grab the resources 
    const resources = useSelector(store => store.todoListResourcesReducer);
    const titles = useSelector(store => store.todolist); // grab the titles of past todo lists for current users
    console.log(resources) // test the resourcess
    console.log(titles) // test to make sure the titles are coming back good
    return (
        <>
            <Container sx={{ flexDirection: 'column', display: 'flex', alignContent: 'center', justifyContent: 'center', maxWidth: '100%' }} >
                <Typography variant='h2' gutterBottomn align='center' paddingBottom={4}>Todo List Page</Typography>
                <Paper sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', width: '100%' }} elevation={2}>
                    <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}
                        component={'nav'} aria-labelledby='nested-list-subheader'
                        subheader={
                            <ListSubheader variant='h4' component={'heading'}>
                                Todo List Title
                            </ListSubheader>}>
                        <ListItemButton>
                            <ListItemText> item 1</ListItemText>
                        </ListItemButton>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText>sub text for item 1</ListItemText>
                            </ListItemButton>
                        </List>
                    </List>

                </Paper>
            </Container>
        </>
    )
}