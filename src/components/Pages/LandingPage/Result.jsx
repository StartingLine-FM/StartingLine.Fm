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
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';


export default function Result({ result, currentList, setCurrentList }) {

    useEffect(() => {
        if (user.id) {
            dispatch({
                type: "FETCH_TABLE_LISTS"
            });
        }
    }, []);


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

    const categoryTag = (id) => {
        if (result) {
            switch (id) {
                case 1:
                    return "Government";
                case 2:
                    return "Funding";
                case 3:
                    return "University";
                case 4:
                    return "Support";
                case 5:
                    return "Service Provider";
                case 6:
                    return "Big Company";
                case 7:
                    return "Research";
                default:
                    break;
            }
        }
    }

    const stageTag = (id) => {
        if (result) {
            switch (id) {
                case 1:
                    return "All Stages";
                case 2:
                    return "Nascent";
                case 3:
                    return "Early";
                case 4:
                    return "Startup/Seed";
                case 5:
                    return "Growth";
                default:
                    break;
            }
        }
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

        console.log(currentList);

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
                    result={result} categoryTag={categoryTag}
                    stageTag={stageTag}
                    userPostTodo={userPostTodo}
                    anonPostTodo={anonPostTodo}
                />}
            <Card raised sx={{ height: 250, maxWidth: 250, pb: 1 }}>
                {
                    todoResources.some(e => e.id === result.id || e.resource_id === result.id)
                        ? <IconButton>
                            <StarIcon color="warning" />
                        </IconButton>
                        : user.id
                            ? <IconButton onClick={() => userPostTodo()} >
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
                    <CardContent sx={{ py: 1 }}>
                        <Typography
                            sx={{
                                fontSize: "14px",
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
                                fontSize: "10px",
                                lineHeight: "normal",
                                mb: 1,
                                pb: 0,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "4",
                                WebkitBoxOrient: "vertical",
                            }}>
                            {result.description}
                        </Typography>
                        {result.category_id &&
                            <Chip size="small" sx={{ fontSize: "10px" }} label={categoryTag(result.category_id)} />
                        }
                        {result.stage_id &&
                            <Chip size="small" sx={{ fontSize: "10px" }} label={stageTag(result.stage_id)} />
                        }
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}