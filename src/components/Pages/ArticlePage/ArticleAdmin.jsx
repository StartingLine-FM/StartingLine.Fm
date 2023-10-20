import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { TextField, Typography, Container, Paper, Box } from "@mui/material";
import editor from "../../../editor";

export default function ArticleAdmin() {

    const [newArticle, setNewArticle] = useState({ title: '', author: '', image_url: '', body: '' })

    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

      // Check if the user is not an admin and redirect to the home page
  useEffect(() => {
    if (!user.admin) {
      history.push('/home');
    }
  }, [user.admin, history]);

    return (

        <Container>
            <Paper>
                <TextField
                    label="Title"
                    variant="standard"
                    required
                    onChange={(e) => setNewArticle.title(e.target.value)}
                />
                <TextField
                    label="Author Name"
                    variant="standard"
                    required
                    onChange={(e) => setNewArticle.author(e.target.value)}
                />
                <TextField
                    label="Image URL"
                    variant="standard"
                    required
                    onChange={(e) => setNewArticle.image_url(e.target.value)}
                />
            </Paper>
        </Container>
    )

}