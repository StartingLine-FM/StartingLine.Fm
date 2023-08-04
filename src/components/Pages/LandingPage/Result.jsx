// import use selector and use dispatch
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import moment from "moment";

import ResultModal from "./ResultModal";

// MUI
import {
    Card,
    CardMedia,
    Typography,
    CardContent,
    CardActionArea,
    IconButton,
    Chip,
    Snackbar,
    Alert,
    Tooltip
} from '@mui/material'
// MUI Icons
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function Result({ result, currentList, categories, stages }) {


    // local state
    // open variables for ResultModal and Snackbar
    const [open, setOpen] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    // state variables for snackbar message, color, and actions
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("success");

    // Redux
    const user = useSelector(store => store.user)
    const todoResources = useSelector(store => store.todoListResourcesReducer);
    const tableList = useSelector(store => store.tableListReducer);
    const dispatch = useDispatch();

    // click handler for opening ResultModal
    const handleClickOpen = () => {
        setOpen(true);
    }

    // click handler for closing ResultModal
    const handleClose = () => {
        setOpen(false);
        setSnackOpen(false);
    }

    // adds a to-do list item for a user that's not currently registered or logged in
    const anonPostTodo = (e) => {

        // set message and color for snackbar
        snackbarConditionals(e)

        // post selected search result 
        dispatch({
            type: "POST_ANON_TODO_LIST",
            payload: result
        })

        // triggers success snackbar
        setSnackOpen(true);
    }

    // adds a to-do list item for a logged-in user
    const userPostTodo = (e) => {

        // set message and color for snackbar
        snackbarConditionals(e);

        // if this is the user's first list, post a new one with a default title
        if (tableList.length === 0) {
            let currentDate = moment().format("MM/DD/YYYY");

            dispatch({
                type: "POST_NEW_TITLE",
                payload: {
                    title: `TO-DO: ${currentDate}`
                }
            });
        }

        // only dispatch if a user has selected a todo list to add to
        currentList &&
            dispatch({
                type: "POST_TODO_LIST",
                payload: {
                    resource_id: result.id,
                    title_table_id: currentList
                }
            })

        // open snackbar, dude!
        setSnackOpen(true);
    }

    // conditionally renders message and color settings for snackbar
    const snackbarConditionals = (e) => {

        if (user.id && currentList) {
            const list = (tableList.length > 0 && tableList.find(title => title.id === currentList));
            setMessage(`Successfully added to ${list.title}!`);
            setColor("success");
        } else if ((user.id && !currentList)) {
            setMessage("Please select a To-Do list before adding a resource");
            setColor("error");
        } else if (!user.id) {
            setMessage("Successfully added to your todo list!");
            setColor("success");
        }
    }

    // snackbar action component
    const action =
        <IconButton
            size="small"
            aria-label="close"
            onClick={() => setSnackOpen(false)}
        >
            <CloseIcon />
        </IconButton>

    return (
        <>
            {result &&
                <>
                    <ResultModal
                        open={open}
                        handleClose={handleClose}
                        result={result}
                        categories={categories}
                        stages={stages}
                        userPostTodo={userPostTodo}
                        anonPostTodo={anonPostTodo}
                    />
                    <Snackbar
                        open={snackOpen}
                        anchorOrigin={{ vertical: '', horizontal: 'left' }}
                        autoHideDuration={5000}
                        onClose={() => setSnackOpen(false)}
                        action={action}
                    >
                        <Alert onClose={() => setSnackOpen(false)} severity={color}>
                            {message}
                        </Alert>
                    </Snackbar>
                </>
            }
            <Card raised sx={{ height: 250, maxWidth: 250 }}>
                {
                    // checks if current to-do list contains this resource
                    todoResources.some(e => e.id === result.id || e.resource_id === result.id)
                        // if on the current list, renders a checkmark
                        ? <Tooltip placement="right" title="Added to your current list">
                            <IconButton>
                                <CheckIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                        : user.id
                            // else if not on todo list, it checks if the user is logged in
                            // less information-heavy tooltip for registered user
                            ? <Tooltip placement="right" title="Adds this resource to your currently selected to-do list.">
                                <IconButton onClick={(e) => userPostTodo(e.target)} >
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                            // more informative tooltip for anonymous user
                            : <Tooltip placement="right" title="Adds this resource to your temporary to-do list, which can be found in the TODO LIST tab above.">
                                <IconButton onClick={(e) => anonPostTodo(e.target)}>
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                }
                {/* this whole action area will open the result modal onclick */}
                <CardActionArea onClick={handleClickOpen} >
                    {result.image_url &&
                        <CardMedia
                            sx={{ height: 100 }}
                            image={result.image_url}
                            title='Resource Image' />
                    }
                    <CardContent sx={{ py: 1 }}>
                        {/* incoming text is formatted to trail off instead of influencing the size of the card */}
                        <Typography
                            sx={{
                                width: "95%",
                                fontSize: "1rem",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "1",
                                WebkitBoxOrient: "vertical"
                            }}>
                            {result.name}
                        </Typography>
                        <Typography
                            paragraph
                            variant="caption"
                            sx={{
                                fontSize: ".7em",
                                lineHeight: "normal",
                                mb: 1,
                                pb: 0,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "3",
                                WebkitBoxOrient: "vertical",
                            }}>
                            {result.description}
                        </Typography>
                            <Chip color="primary" size="small" sx={{ fontSize: "10px" }} label={result.category_name} />
                            <Chip color="secondary" size="small" sx={{ fontSize: "10px", ml: 1 }} label={result.stage_name} />
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}