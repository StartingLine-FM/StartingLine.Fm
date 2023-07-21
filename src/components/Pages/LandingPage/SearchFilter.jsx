import { useDispatch } from "react-redux";
import { useState } from "react";
import {
    Container,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    List,
    ListItemButton,
    ListItemText,
    Collapse,
} from '@mui/material';
// MUI Icons
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';


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

    // instantiating Redux dispatch function
    const dispatch = useDispatch();

    // click handler for Category filter dropdown
    const handleCategoryClick = () => {
        setCategoryOpen(!categoryOpen);
    }

    // click handler for Stage filter dropdown
    const handleStageClick = () => {
        setStageOpen(!stageOpen);
    }

    // clears all selected filters / text search, reset to showing all results
    const clearFilters = () => {

        setSelectedCategory("");
        setSelectedStage("");
        setTextSearch("");

        dispatch({
            type: "FETCH_SEARCH"
        });
    }

    // execute search with selected filters / text
    const fetchSearch = () => {

        let query = {};

        // all 3 defined
        if (selectedCategory && selectedStage && textSearch) {
            query = {
                category: selectedCategory,
                stage: selectedStage,
                text: textSearch
            }
            // category and stage
        } else if (selectedCategory && selectedStage && !textSearch) {
            query = {
                category: selectedCategory,
                stage: selectedStage
            }
            // category and text
        } else if (selectedCategory && !selectedStage && textSearch) {
            query = {
                category: selectedCategory,
                text: textSearch
            }
            // stage and text
        } else if (!selectedCategory && selectedStage && textSearch) {
            query = {
                stage: selectedStage,
                text: textSearch
            }
            // category
        } else if (selectedCategory && !selectedStage && !textSearch) {
            query = {
                category: selectedCategory
            }
            // stage
        } else if (!selectedCategory && selectedStage && !textSearch) {
            query = {
                stage: selectedStage
            }
            // text
        } else if (!selectedCategory && !selectedStage && textSearch) {
            query = {
                text: textSearch
            }
        }

        // Send off our dispatch with our selected query
        dispatch({
            type: "FETCH_SEARCH",
            payload: {
                query
            }
        })

    }

    return (
        <Container>
            <Grid container flexDirection={"column"}>
                {/* Text search input */}
                <Grid item>
                    <TextField
                        placeholder="Search"
                        size="small"
                        value={textSearch}
                        onChange={(e) => setTextSearch(e.target.value)}
                    />
                    <Button variant="contained" onClick={fetchSearch} >Search</Button>
                </Grid>
                {/* Category and Stage filter dropdowns */}
                <Grid item>
                    <Paper>
                        <Typography>Filter by</Typography>
                        <List>
                            {/* Category 'header' dropdown */}
                            <ListItemButton onClick={handleCategoryClick}>
                                <ListItemText primary="Category" />
                                {categoryOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            {/* Category list */}
                            <Collapse in={categoryOpen} timeout="auto" unmountOnExit>
                                <List>
                                    <ListItemButton>
                                        {/* We're using MUI Icons to fake Radio Button functionality here lol
                                        If the selectedCategory matches this line, we're showing a Checked Radio Button icon,
                                        if not, it's unchecked. */}
                                        {selectedCategory === "Government" ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
                                        {/* Clicking on this list item sets the selectedCategory to the correct string to send to the backend */}
                                        <ListItemText sx={{ ml: 1 }} primary="Government" onClick={(e) => setSelectedCategory("Government")} />
                                    </ListItemButton>
                                    <ListItemButton>
                                        {selectedCategory === "Funding Organization" ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
                                        <ListItemText sx={{ ml: 1 }} primary="Funding Organization" onClick={(e) => setSelectedCategory("Funding Organization")} />
                                    </ListItemButton>
                                    <ListItemButton>
                                        {selectedCategory === "University" ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
                                        <ListItemText sx={{ ml: 1 }} primary="University" onClick={(e) => setSelectedCategory("University")} />
                                    </ListItemButton>
                                    <ListItemButton>
                                        {selectedCategory === "Support Organization" ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
                                        <ListItemText sx={{ ml: 1 }} primary="Support Organization" onClick={(e) => setSelectedCategory("Support Organization")} />
                                    </ListItemButton>
                                    <ListItemButton>
                                        {selectedCategory === "Service Provider" ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
                                        <ListItemText sx={{ ml: 1 }} primary="Service Provider" onClick={(e) => setSelectedCategory("Service Provider")} />
                                    </ListItemButton>
                                    <ListItemButton>
                                        {selectedCategory === "Big Company" ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
                                        <ListItemText sx={{ ml: 1 }} primary="Big Company" onClick={(e) => setSelectedCategory("Big Company")} />
                                    </ListItemButton>
                                    <ListItemButton>
                                        {selectedCategory === "Research Organization" ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
                                        <ListItemText sx={{ ml: 1 }} primary="Research Organization" onClick={(e) => setSelectedCategory("Research Organization")} />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                            {/* Business Stage dropdown */}
                            <ListItemButton onClick={handleStageClick}>
                                <ListItemText primary="Business Stage" />
                                {stageOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            {/* Business Stage list */}
                            <Collapse in={stageOpen} timeout="auto" unmountOnExit>
                                <List>
                                    <ListItemButton>
                                        {/* Same idea as shown in the Category list above of faking the Radio Buttons
                                        and sending the correct string */}
                                        {selectedStage === "Nascent" ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
                                        <ListItemText sx={{ ml: 1 }} primary="Nascent" onClick={(e) => setSelectedStage("Nascent")} />
                                    </ListItemButton>
                                    <ListItemButton>
                                        {selectedStage === "Early Stage" ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
                                        <ListItemText sx={{ ml: 1 }} primary="Early Stage" onClick={(e) => setSelectedStage("Early Stage")} />
                                    </ListItemButton>
                                    <ListItemButton>
                                        {selectedStage === "Startup/Seed" ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
                                        <ListItemText sx={{ ml: 1 }} primary="Startup/Seed" onClick={(e) => setSelectedStage("Startup/Seed")} />
                                    </ListItemButton>
                                    <ListItemButton>
                                        {selectedStage === "Growth" ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
                                        <ListItemText sx={{ ml: 1 }} primary="Growth" onClick={(e) => setSelectedStage("Growth")} />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </List>
                        {/* Apply filters button */}
                        <Button variant="outlined" onClick={fetchSearch} >Apply Filters</Button>
                        {/* Clear filters button */}
                        <Button variant="outlined" onClick={clearFilters} >Clear Filters</Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}