import { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Typography, Container, Paper, Box } from "@mui/material";
import editor from "../../../editor";

export default function ArticleAdmin() {

    const [newArticle, setNewArticle] = useState({ title: '', author: '', image_url: '', body: '' })

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