import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHits } from "react-instantsearch";
import moment from "moment";

import ResultModal from "./ResultModal";
import fallbackImage from './resource-fallback-image.jpg';

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
    Tooltip,
    Grid
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function Result({ hit, currentList, categories, stages }) {
    const [open, setOpen] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("success");


    const user = useSelector(store => store.user);
    const todoResources = useSelector(store => store.todoListResourcesReducer);
    const tableList = useSelector(store => store.tableListReducer);
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setSnackOpen(false);
    }

    const anonPostTodo = (e) => {
        snackbarConditionals(e);
        dispatch({
            type: "POST_ANON_TODO_LIST",
            payload: hit
        });
        setSnackOpen(true);
    }

    const userPostTodo = (e) => {
        snackbarConditionals(e);

        if (tableList.length === 0) {
            let currentDate = moment().format("MM/DD/YYYY");
            dispatch({
                type: "POST_NEW_TITLE",
                payload: {
                    title: `TO-DO: ${currentDate}`
                }
            });
        }

        currentList && dispatch({
            type: "POST_TODO_LIST",
            payload: {
                resource_id: hit.id,
                title_table_id: currentList
            }
        });

        setSnackOpen(true);
    }

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
        {hit && 
            <>
            <ResultModal
                        open={open}
                        handleClose={handleClose}
                        hit={hit}
                        // categories={categories}
                        stages={stages}
                        userPostTodo={userPostTodo}
                        anonPostTodo={anonPostTodo}
                    />
                    <Snackbar
                        open={snackOpen}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        autoHideDuration={5000}
                        onClose={() => setSnackOpen(false)}
                        action={action}
                    >
                        <Alert onClose={() => setSnackOpen(false)} severity={color}>
                            {message}
                        </Alert>
                    </Snackbar>
                    
            <Card raised sx={{ height: 250, width: "100%" }}>
                {todoResources.some(e => e.objectID === hit.objectID || e.resource_id === hit.objectID) ? (
                    <Tooltip placement="right" title="Added to your current list">
                        <IconButton>
                            <CheckIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                ) : user.id ? (
                    <Tooltip placement="right" title="Adds this resource to your currently selected to-do list.">
                        <IconButton onClick={(e) => userPostTodo(e.target)} >
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip placement="right" title="Adds this resource to your temporary to-do list, which can be found in the TODO LIST tab above.">
                        <IconButton onClick={(e) => anonPostTodo(e.target)}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                )
                }
                <CardActionArea onClick={handleClickOpen} >
                    {hit.image_url ? (
                        <div style={{ padding: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', overflow: 'hidden' }}>
                            <img style={{ display: 'block', maxWidth: '100%', maxHeight: '100px' }} src={hit.image_url} alt={hit.name} />
                        </div>
                    ) : (
                        <div style={{ padding: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', overflow: 'hidden' }}>
                            <img style={{ display: 'block', maxWidth: '100%', maxHeight: '100px' }} src={fallbackImage} alt="Fallback" />
                        </div>
                    )}
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
                            {hit.name}
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
                            {hit.description}
                        </Typography>
                        <Chip color="primary" size="small" sx={{ fontSize: "10px" }} label={hit.organization_name} />
                        <Chip color="secondary" size="small" sx={{ fontSize: "10px", ml: 1 }} label={hit.stage_name} />
                    </CardContent>
                </CardActionArea>
            </Card>
            </>
}
        </>
    );
}
