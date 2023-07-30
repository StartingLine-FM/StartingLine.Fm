import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    IconButton,
    ButtonGroup,
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    Divider
} from '@mui/material';
// MUI Icons
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import SendIcon from '@mui/icons-material/Send';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';


export default function SearchFilter({ currentList, setCurrentList, categories, stages }) {

    // local state:
    // Category
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categoryOpen, setCategoryOpen] = useState(false);
    // Business Stage
    const [selectedStage, setSelectedStage] = useState("");
    const [stageOpen, setStageOpen] = useState(false);
    // Text
    const [textSearch, setTextSearch] = useState("");
    // change variable to track for conditional rendering on filters
    const [changes, setChanges] = useState(false);
    // User To-Do list titles
    const [titleOpen, setTitleOpen] = useState(false);

    // Redux
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const titles = useSelector(store => store.tableListReducer)

    // click handler for Category filter dropdown
    const handleCategoryClick = () => {
        setCategoryOpen(!categoryOpen);
    }

    // click handler for Stage filter dropdown
    const handleStageClick = () => {
        setStageOpen(!stageOpen);
    }

    // click handler for todo list title filter dropdown
    const handleTitleClick = () => {
        setTitleOpen(!titleOpen);
    }

    // clears all selected filters / text search, reset to showing all results
    const clearFilters = () => {

        setSelectedCategory("");
        setSelectedStage("");
        setTextSearch("");
        setChanges(false);

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

        console.log(query);

        // Send off our dispatch with our selected query
        dispatch({
            type: "FETCH_SEARCH",
            payload: {
                query
            }
        })

        setChanges(false);
    }

    return (
        <Grid container flexDirection={"column"} width={"25%"}>
            <Paper sx={{ mr: 2, px: 2, pt: 2, pb: 100 }}>
                {/* Text search input */}
                <Grid item sx={{ mb: 1 }}>
                    <TextField
                        placeholder="Search"
                        size="small"
                        sx={{ width: "70%" }}
                        value={textSearch}
                        onChange={(e) => setTextSearch(e.target.value)}
                    />
                    {
                        textSearch
                            ? <IconButton color='primary' onClick={fetchSearch}><SendIcon /></IconButton>
                            : <IconButton ><SendOutlinedIcon /></IconButton>
                    }
                    <Divider />
                </Grid>
                {/* Category and Stage filter dropdowns */}
                <Grid item>
                    <ButtonGroup sx={{ mb: 1 }}>
                        {/* Apply filters button */}
                        {changes
                            ? <Button variant="contained" onClick={fetchSearch} >Apply</Button>
                            : <Button variant="outlined" onClick={fetchSearch} >Apply</Button>
                        }
                        {/* Clear filters button */}
                        {selectedCategory || selectedStage || textSearch
                            ? <Button color="secondary" variant="contained" onClick={clearFilters} >Clear</Button>
                            : <Button color="secondary" variant="outlined" onClick={clearFilters} >Clear</Button>
                        }
                    </ButtonGroup>
                    <br />
                    <Typography variant="caption">Filter by</Typography>
                    <List>
                        {/* Category 'header' dropdown */}
                        <ListItemButton onClick={handleCategoryClick}>
                            <ListItemText primary="Category" />
                            {categoryOpen ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
                        </ListItemButton>
                        {/* Category list */}
                        <Collapse in={categoryOpen} timeout="auto" unmountOnExit>
                            <List>
                                {/* We're using MUI Icons to fake Radio Button functionality here lol
                                    If the selectedCategory matches this line, we're showing a Checked Radio Button icon,
                                    if not, it's unchecked. 
                                Clicking on this list item sets the selectedCategory to the correct string to send to the backend */}
                                {categories &&
                                    categories.map(cat => {
                                        return (
                                            <ListItemButton key={cat.id} onClick={() => { setSelectedCategory(cat.id); !changes && setChanges(true); }} >
                                                {selectedCategory === cat.id ? <RadioButtonCheckedIcon color="primary" /> : <RadioButtonUncheckedIcon />}
                                                <ListItemText sx={{ ml: 1 }} primary={cat.name} />
                                            </ListItemButton>
                                        )
                                    })}
                            </List>
                        </Collapse>
                        {/* Business Stage dropdown */}
                        <ListItemButton onClick={handleStageClick}>
                            <ListItemText primary="Business Stage" />
                            {stageOpen ? <ExpandLess color="secondary" /> : <ExpandMore color="secondary" />}
                        </ListItemButton>
                        {/* Business Stage list */}
                        <Collapse in={stageOpen} timeout="auto" unmountOnExit>
                            <List>
                                {stages &&
                                    stages.map(stage => {
                                        return (
                                            <ListItemButton onClick={() => { setSelectedStage(stage.id); !changes && setChanges(true); }}>
                                                {/* Same idea as shown in the Category list above of faking the Radio Buttons
                                                and sending the correct string */}
                                                {selectedStage === stage.id ? <RadioButtonCheckedIcon color="secondary" /> : <RadioButtonUncheckedIcon />}
                                                <ListItemText sx={{ ml: 1 }} primary={stage.name} />
                                            </ListItemButton>
                                        )
                                    })}
                            </List>
                        </Collapse>
                    </List>
                    {user.id && titles.length > 0 &&
                        <>
                            <Typography variant="caption">Select To-Do List</Typography>
                            <ListItemButton onClick={handleTitleClick}>
                                <ListItemText primary={`${user.username}'s Lists`} />
                                {titleOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={titleOpen} timeout="auto" unmountOnExit>
                                {titles &&
                                    titles.map(list => {
                                        return (
                                            <ListItemButton key={list.id} onClick={() => { setCurrentList(list.id) }}>
                                                {currentList === list.id ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
                                                <ListItemText sx={{ ml: 1 }} primary={list.title} />
                                            </ListItemButton>

                                        )
                                    })}
                            </Collapse>
                        </>
                    }
                </Grid>
            </Paper >
        </Grid >
    )
}