import {
    Typography,
    Card,
    CardActionArea,
    CardMedia,
    CardActions,
    CardContent
} from "@mui/material"

export default function ArticleCard({ article }) {

    return (
        <Card sx={{ height: 500 }}>
            <CardMedia component="img" src={article.image_url} />
            <CardContent>
                <Typography variant="h5">{article.title}</Typography>
                <Typography variant="h6" color="primary">{article.author}</Typography>
            </CardContent>
        </Card >
    )
}