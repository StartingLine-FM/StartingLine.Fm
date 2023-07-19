import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
    Container,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    RadioGroup,
    List,
    ListSubheader,
    ListItemButton,
    ListItemText,
    Collapse,
} from '@mui/material';

export default function SearchFilter() {

    // local state
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categoryOpen, setCategoryOpen] = useState(false);

    const [selectedStage, setSelectedStage] = useState("");
    const [stageOpen, setStageOpen] = useState(false);
    const [textSearch, setTextSearch] = useState("");
    const [order, setOrder] = useState("");

    const dispatch = useDispatch();

    // click handler for Category filter dropdown
    const handleCategoryClick = () => {
        setCategoryOpen(!categoryOpen);
    }

    // click handler for Stage filter dropdown
    const handleStageClick = () => {
        setStageOpen(!stageOpen);
    }

    // execute search with selected filters / text
    const fetchSearch = () => {
        let query = {};

        if (selectedCategory && selectedStage && textSearch) {
            query = {
                category: selectedCategory,
                stage: selectedStage,
                text: textSearch
            }
        } else if (selectedCategory && selectedStage && !textSearch) {
            query = {
                category: selectedCategory,
                stage: selectedStage
            }
        } else if (selectedCategory && !selectedStage && textSearch) {
            query = {
                category: selectedCategory,
                text: textSearch
            }
        } else if (!selectedCategory && selectedStage && textSearch) {
            query = {
                stage: selectedStage,
                text: textSearch
            }
        } else if (selectedCategory && !selectedStage && !textSearch) {
            query = {
                category: selectedCategory
            }
        } else if (!selectedCategory && selectedStage && !textSearch) {
            query = {
                stage: selectedStage
            }
        } else if (!selectedCategory && !selectedStage && textSearch) {
            query = {
                text: textSearch
            }
        }

        console.log(query, order);

        // order
        // ? dispatch({
        //     type: "FETCH_SEARCH",
        //     payload: {
        //         query,
        //         order
        //     }
        // })
        // : dispatch({
        //     type: "FETCH_SEARCH",
        //     payload: {
        //         query
        //     }
        // })

    }


    return (
        <Container>
            <Grid container flexDirection={"column"}>
                <Grid item>
                    <TextField
                        value={textSearch}
                        onChange={(e) => setTextSearch(e.target.value)}
                    />
                    <Button variant="contained" onClick={fetchSearch} >Search</Button>
                </Grid>
                <Grid item>
                    <Typography variant="body1">Filter by</Typography>
                    <List>
                        <ListItemButton onClick={handleCategoryClick}>
                            <ListItemText primary="Category" />
                        </ListItemButton>
                        <Collapse in={categoryOpen} timeout="auto" unmountOnExit>
                            <List>
                                <ListItemButton value="Government" >
                                    <ListItemText primary="Government" value="Government" onClick={(e) => setSelectedCategory(e.target.value)} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Funding Organization" value="Funding Organization" onClick={(e) => setSelectedCategory(e.target.value)} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="University" value="University" onClick={(e) => setSelectedCategory(e.target.value)} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Support Organization" value="Support Organization" onClick={(e) => setSelectedCategory(e.target.value)} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Service Provider" value="Service Provider" onClick={(e) => setSelectedCategory(e.target.value)} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Big Company" value="Big Company" onClick={(e) => setSelectedCategory(e.target.value)} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Research Organization" value="Research Organization" onClick={(e) => setSelectedCategory(e.target.value)} />
                                </ListItemButton>
                            </List>
                        </Collapse>
                        <ListItemButton onClick={handleStageClick}>
                            <ListItemText primary="Stage" />
                        </ListItemButton>
                        <Collapse in={stageOpen} timeout="auto" unmountOnExit>
                            <List>
                                <ListItemButton>
                                    <ListItemText primary="Nascent" value="Nascent" onClick={(e) => setSelectedStage(e.target.value)} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Early Stage" value="Early Stage" onClick={(e) => setSelectedStage(e.target.value)} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Startup/Seed" value="Startup/Seed" onClick={(e) => setSelectedStage(e.target.value)} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Growth" value="Growth" onClick={(e) => setSelectedStage(e.target.value)} />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </List>
                    <Button variant="contained" onClick={fetchSearch} >Apply Filters</Button>
                </Grid>
            </Grid>
        </Container>
    )
}