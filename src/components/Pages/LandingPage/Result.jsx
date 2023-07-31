// import use selector and use dispatch
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment";

import ResultModal from "./ResultModal";

// material ui imports
import {
    Card,
    CardMedia,
    Typography,
    CardContent,
    CardActionArea,
    IconButton,
    Chip,
    Snackbar,
    Alert
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function Result({ result, currentList, categories, stages }) {


    // local state
    const [open, setOpen] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [action, setAction] = useState(null);
    const [color, setColor] = useState("success");

    // Redux
    const user = useSelector(store => store.user)
    const todoResources = useSelector(store => store.todoListResourcesReducer);
    const tableList = useSelector(store => store.tableListReducer);
    const dispatch = useDispatch();
    const history = useHistory();

    // click handler for opening ResultModal
    const handleClickOpen = () => {
        setOpen(true);
    }
    // click handler for closing ResultModal
    const handleClose = () => {
        setOpen(false);
        setSnackOpen(false);
    }

    const anonPostTodo = (e) => {

        snackbarConditionals(e)
        console.log(action, message)

        console.log(result, user)
        dispatch({
            type: "POST_ANON_TODO_LIST",
            payload: result
        })

        setSnackOpen(true);
    }

    const userPostTodo = (e) => {

        snackbarConditionals(e);

        if (tableList.length === 0) {
            console.log(moment().format("MM/DD/YYYY"));
            let currentDate = moment().format("MM/DD/YYYY");

            dispatch({
                type: "POST_NEW_TITLE",
                payload: {
                    title: `TO-DO: ${currentDate}`
                }
            });
        }

        currentList &&
            dispatch({
                type: "POST_TODO_LIST",
                payload: {
                    resource_id: result.id,
                    title_table_id: currentList
                }
            })

        setSnackOpen(true);
    }

    const snackbarConditionals = (e) => {
        if (todoResources.some(e => e.id === result.id || e.resource_id === result.id)) {
            setAction(
                <>
                    <Button color="secondary" size="small" onClick={history.push('/#/todolist')}>
                        View Lists
                    </Button>
                    <IconButton
                        size="small"
                        aria-label="close"
                        onClick={() => setSnackOpen(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </>
            );
        } else {
            setAction(
                <>
                    <IconButton
                        size="small"
                        aria-label="close"
                        onClick={() => setSnackOpen(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </>
            );
        }

        if (user.id && currentList) {
            const list = tableList.find(title => title.id === currentList);
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
            <Card raised sx={{ height: 250, maxWidth: 250, pb: 1 }}>
                {
                    todoResources.some(e => e.id === result.id || e.resource_id === result.id)
                        ? <IconButton>
                            <CheckIcon color="primary" />
                        </IconButton>
                        : user.id
                            ? <IconButton onClick={(e) => userPostTodo(e.target)} >
                                <AddIcon />
                            </IconButton>
                            : <IconButton onClick={(e) => anonPostTodo(e.target)}>
                                <AddIcon />
                            </IconButton>
                }
                <CardActionArea onClick={handleClickOpen} >
                    {result.image_url &&
                        <CardMedia
                            sx={{ height: 100 }}
                            image={result.image_url}
                            title='Resource Image' />
                    }
                    <CardContent sx={{ py: 1 }}>
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
                        {result.category_id &&
                            <Chip color="primary" size="small" sx={{ fontSize: "10px", mb: 1 }} label={result.category_name} />
                        }
                        {result.stage_id &&
                            <Chip color="secondary" size="small" sx={{ fontSize: "10px", ml: 1, mb: 1 }} label={result.stage_name} />
                        }
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}