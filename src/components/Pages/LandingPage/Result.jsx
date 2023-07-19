// import use selector and use dispatch
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// material ui imports
import {Card, CardMedia, Typography, CardContent} from '@mui/material'


export default function Result({ name, image, description }) {

    return (
        <>
            <Card sx={{ maxWidth: 250 }}>
                <CardMedia image={image} title='Resource Image' />
                <CardContent>
                    <Typography>
                        {name}
                    </Typography>
                    <Typography>
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}