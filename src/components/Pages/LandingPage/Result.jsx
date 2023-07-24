// import use selector and use dispatch
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import ResultModal from "./ResultModal";

// material ui imports
import {
    Card,
    CardMedia,
    Typography,
    CardContent,
    CardActionArea,
    IconButton
} from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';


export default function Result({ result }) {

    // local state
    const [open, setOpen] = useState(false);

    // Redux
    const user = useSelector(store => store.user)
    const todoResources = useSelector(store => store.todoListResourcesReducer);
    const todoList = useSelector(store => store.todoListReducer);
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

    return (
        <>
            {result &&
                <ResultModal open={open} handleClose={handleClose} result={result} />}
            <Card sx={{ height: 250 }}>
                {
                    todoResources.some(e => e.id === result.id)
                        ? <IconButton>
                            <StarIcon color="warning" />
                        </IconButton>
                        : user
                            ? <IconButton onClick={() => anonPostTodo()}>
                                <StarBorderIcon />
                            </IconButton>
                            : <IconButton onClick={() => anonPostTodo()}>
                                <StarBorderIcon />
                            </IconButton>
                }
                <CardMedia
                    sx={{ height: 100 }}
                    image={
                        result.image
                            ? result.image
                            : 'https://images.unsplash.com/photo-1595343208792-b7d268abb3be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'}
                    title='Resource Image' />
                <CardActionArea onClick={handleClickOpen} >
                    <CardContent sx={{ maxHeight: 100 }}>
                        <Typography variant="body2">
                            {result.name}
                        </Typography>
                        <Typography variant="caption" sx={{ fontSize: "10px", maxHeight: 75, lineHeight: "normal" }}>
                            {result.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}