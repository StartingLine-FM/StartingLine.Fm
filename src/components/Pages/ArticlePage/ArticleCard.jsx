import { useHistory } from "react-router-dom"
// MUI
import {
    Typography,
    Card,
    CardActionArea,
    CardMedia,
    CardActions,
    CardContent
} from "@mui/material"

export default function ArticleCard({ article }) {

    const history = useHistory();

    return (
        <Card sx={{ height: 500 }}>
            <CardMedia component="img" src={article.image_url} sx={{ height: 300 }} />
            <CardContent>
                <CardActionArea onClick={() => history.push(`articles/${article.title}`)}>
                    <Typography variant="h5">{article.title}</Typography>
                    <Typography variant="h6" color="primary">{article.author}</Typography>
                </CardActionArea>
            </CardContent>
        </Card >
    )
}