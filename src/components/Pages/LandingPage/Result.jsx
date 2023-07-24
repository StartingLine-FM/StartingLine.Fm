// import use selector and use dispatch
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import ResultModal from "./ResultModal";

// material ui imports
import { Card, CardMedia, Typography, CardContent, CardActionArea } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';


export default function Result({ result }) {

    const [open, setOpen] = useState(false);

    // click handler for opening ResultModal
    const handleClickOpen = () => {
        setOpen(true);
    }
    // click handler for closing ResultModal
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            {result &&
                <ResultModal open={open} handleClose={handleClose} result={result} />}
            <Card sx={{ height: 250 }}>
                <StarBorderIcon sx={{ m: 1 }} />
                <CardMedia
                    sx={{ height: 100 }}
                    image={
                        result.image
                            ? result.image
                            : 'https://images.unsplash.com/photo-1595343208792-b7d268abb3be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'}
                    title='Resource Image' />
                <CardActionArea onClick={handleClickOpen} sx={{mx:1}} >
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