// import use selector and use dispatch
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// material ui imports
import {Card, CardMedia, Typography, CardContent} from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';


export default function Result({ result }) {

    return (
        <>
            <Card sx={{ width: 300 }}>
                <CardMedia sx={{ height: 100 }} image={result.image && result.image} title='Resource Image' />
                <CardContent>
                    <Typography>
                        {result.name}
                    </Typography>
                    <Typography>
                        {result.description}
                    </Typography>
                    {/* logic for conditional rendering based on if
                     the particular resource is in the store already or not */}
                    <StarBorderIcon />
                </CardContent>
            </Card>
        </>
    )
}