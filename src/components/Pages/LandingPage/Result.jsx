// import use selector and use dispatch
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
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
    Box
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

export default function Result({ result, currentList, categories, stages }) {


    // local state
    const [open, setOpen] = useState(false);

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
    }

    const anonPostTodo = () => {
        console.log(result, user)
        dispatch({
            type: "POST_ANON_TODO_LIST",
            payload: result
        })
    }

    const userPostTodo = () => {

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

    }

    return (
        <>
            {result &&
                <ResultModal
                    open={open}
                    handleClose={handleClose}
                    result={result}
                    categories={categories}
                    stages={stages}
                    userPostTodo={userPostTodo}
                    anonPostTodo={anonPostTodo}
                />}
            <Card raised sx={{ height: 250, maxWidth: 250, pb: 1 }}>
                {
                    todoResources.some(e => e.id === result.id || e.resource_id === result.id)
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
                            <Chip color="secondary" size="small" sx={{ fontSize: "10px", ml: 1, mb:1 }} label={result.stage_name} />
                        }
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}