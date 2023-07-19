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
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function SearchFilter() {

    // local state:
    // Category
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categoryOpen, setCategoryOpen] = useState(false);
    // Stage
    const [selectedStage, setSelectedStage] = useState("");
    const [stageOpen, setStageOpen] = useState(false);
    // Text
    const [textSearch, setTextSearch] = useState("");
    // Order By queries
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

    // clears all selected filters / text search
    const clearFilters = () => {
        setSelectedCategory("");
        setSelectedStage("");
        setTextSearch("");
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

        order
        ? dispatch({
            type: "FETCH_SEARCH",
            payload: {
                query,
                order
            }
        })
        : dispatch({
            type: "FETCH_SEARCH",
            payload: {
                query
            }
        })

    }


    return (
        <Container>
            <Grid container flexDirection={"column"}>
                <Grid item>
                    <TextField
                        placeholder="Search"
                        size="small"
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
                            {categoryOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        
                        
                        <Collapse in={categoryOpen} timeout="auto" unmountOnExit>
                            <List>
                                <ListItemButton>
                                    <ListItemText primary="Government" onClick={(e) => {setSelectedCategory("Government"); }} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Funding Organization" onClick={(e) => setSelectedCategory("Funding Organization")} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="University" onClick={(e) => setSelectedCategory("University")} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Support Organization" onClick={(e) => setSelectedCategory("Support Organization")} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Service Provider" onClick={(e) => setSelectedCategory("Service Provider")} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Big Company" onClick={(e) => setSelectedCategory("Big Company")} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Research Organization" onClick={(e) => setSelectedCategory("Research Organization")} />
                                </ListItemButton>
                            </List>
                        </Collapse>
                        <ListItemButton onClick={handleStageClick}>
                            <ListItemText primary="Business Stage" />
                            {stageOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={stageOpen} timeout="auto" unmountOnExit>
                            <List>
                                <ListItemButton>
                                    <ListItemText primary="Nascent" onClick={(e) => setSelectedStage("Nascent")} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Early Stage" onClick={(e) => setSelectedStage("Early Stage")} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Startup/Seed" onClick={(e) => setSelectedStage("Startup/Seed")} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Growth" onClick={(e) => setSelectedStage("Growth")} />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </List>
                    <Button variant="contained" onClick={fetchSearch} >Apply Filters</Button>
                    <Button variant="contained" onClick={clearFilters} >Clear Filters</Button>
                </Grid>
            </Grid>
        </Container>
    )
}