import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ArticleCard from './ArticleCard';
//MUI
import {
    Container,
    Grid,
} from '@mui/material';

export default function ArticleList(props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const articleList = useSelector((store) => store.articles.articleList);
    const user = useSelector((state) => state.user); // Get the user information

    useEffect(() => {
        if (!user.admin) {
          history.push('/home');
        }
      }, [user.admin, history]);

    useEffect(() => {
        dispatch({
            type: "FETCH_ARTICLES_LIST"
        })
    }, []);

    return (
        <Container maxWidth="lg" sx={{ pt: 3 }}>
            <Grid container spacing={3}>
                {articleList.map(article => {
                    return (
                        <Grid item xs={12} md={6} key={article.id}>
                            <ArticleCard article={article} />
                        </Grid>
                    )
                })};
            </Grid>
        </Container>
    );
}
