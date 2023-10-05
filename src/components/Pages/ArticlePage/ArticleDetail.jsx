import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Paper, Typography, Box } from "@mui/material";

export default function ArticleDetail() {
    const params = useParams();
    const dispatch = useDispatch();
    const article = useSelector(store => store.articles.articleDetail[0]);

    useEffect(() => {
        dispatch({ type: "FETCH_ARTICLE_DETAIL", payload: params })
    }, []);


    return (
        article &&
        <Container>
            <Paper sx={{ p: 3, my: 3 }}>
                <Box component="img" src={article.image_url} sx={{ width: "100%" }} />
                <Typography variant="h5">{article.title}</Typography>
                <Typography variant="h6" color="primary">{article.author}</Typography>
                <div dangerouslySetInnerHTML={{ __html: article.body }} />
            </Paper>
        </Container>
    )

}