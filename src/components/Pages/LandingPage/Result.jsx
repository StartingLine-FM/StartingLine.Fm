// import use selector and use dispatch
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// material ui imports
import { Card, CardMedia, Typography, CardContent } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';


export default function Result({ result }) {

    return (
        <>
            <Card sx={{height: 250}}>
                <StarBorderIcon sx={{m:1}} />
                <CardMedia 
                    sx={{ height: 100 }} 
                    image={result.image 
                    ? result.image 
                    : 'https://images.unsplash.com/photo-1595343208792-b7d268abb3be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'} 
                    title='Resource Image' />
                <CardContent>
                    <Typography>
                        {result.name}
                    </Typography>
                    <Typography variant="caption">
                        {result.description}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}