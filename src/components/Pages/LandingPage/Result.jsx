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
                <StarBorderIcon />
                <CardMedia sx={{ height: 100 }} image={result.image && result.image} title='Resource Image' />
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