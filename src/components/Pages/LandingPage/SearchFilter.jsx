import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, RefinementList, SearchBox, Menu, HierarchicalMenu, ToggleRefinement, DynamicWidgets } from 'react-instantsearch';
import 'instantsearch.css/themes/satellite.css';

// MUI
import {
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    Tooltip
} from '@mui/material';
// MUI Icons
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import InfoIcon from '@mui/icons-material/Info';

import InfoModal from "./InfoModal";

// Algolia Initiation and index
const searchClient = algoliasearch('KK1UO0W0NW', 'acfecaf8e37908662d286dc1210b781b');
// const index = searchClient.initIndex('resource_windows');
const index = searchClient.initIndex('test_resource3');



export default function SearchFilter({ searchQuery, setSearchQuery, currentList, setCurrentList, categories, stages, searchResults, setSearchResults }) {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [selectedStage, setSelectedStage] = useState("");
    const [stageOpen, setStageOpen] = useState(false);
    const [textSearch, setTextSearch] = useState("");
    const [changes, setChanges] = useState(false);
    const [titleOpen, setTitleOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const [supportOpen, setSupportOpen] = useState(false);
    const [entrepreneurOpen, setEntrepreneurOpen] = useState(false);
    const [fundingOpen, setFundingOpen] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const titles = useSelector(store => store.tableListReducer);


    // Algolia Search Function with searchbox component
    const handleSearch = async (query) => {
        if (query.length > 0) {
            try {
                const { hits } = await index.search(query);
                setSearchResults(hits);
            } catch (error) {
                console.error('Error searching:', error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleCategoryClick = () => {
        setCategoryOpen(!categoryOpen);
    };

    const handleStageClick = () => {
        setStageOpen(!stageOpen);
    };

    const handleTitleClick = () => {
        setTitleOpen(!titleOpen);
    };

    const handleSupportClick = () => {
        setSupportOpen(!supportOpen);
    }

    const handleEntrepreneurClick = () => {
        setEntrepreneurOpen(!entrepreneurOpen);
    }

    const handleFundingClick = () => {
        setFundingOpen(!fundingOpen);
    }

    const handleInfoOpen = () => {
        setInfoOpen(true);
    };

    const handleInfoClose = () => {
        setInfoOpen(false);
    };

    const clearFilters = () => {
        setSelectedCategory("");
        setSelectedStage("");
        setTextSearch("");
        setChanges(false);
        dispatch({
            type: "FETCH_SEARCH"
        });
    };

    const fetchTodo = (id) => {
        setCurrentList(id);
        dispatch({
            type: "FETCH_TODO_LIST_RESOURCES",
            payload: id
        });
    };

    return (
        <Grid item xs={12} md={3}>
            <Paper sx={{ width: { xs: "100%" }, mr: { sm: 2 }, px: 2, pt: 2 }}>
                <InfoModal infoOpen={infoOpen} handleInfoClose={handleInfoClose} />

                {/* ALGOLIA SEARCH BOX */}
                <SearchBox
                    translations={{
                        placeholder: 'Search',
                    }}
                    onChange={(event) => handleSearch(event.currentTarget.value)}
                />
                <br />

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="caption">Filter by</Typography>
                    <Tooltip title='Click to see Category and Business Stage details'>
                        <IconButton onClick={handleInfoOpen}>
                            <InfoIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </div>

                {/* BUSINESS STAGE DROP DOWN */}
                <ListItemButton onClick={handleStageClick}>
                    <ListItemText primary="Business Stage" />
                    {stageOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={stageOpen} timeout="auto" unmountOnExit>
                    <List>
                        <RefinementList
                            attribute="stage_name"
                            sortBy={['name:asc']}
                        />
                    </List>
                </Collapse>

                {/* SUPPORT DROP DOWN */}
                <ListItemButton onClick={handleSupportClick}>
                    <ListItemText primary="Support Type" />
                    {supportOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={supportOpen} timeout="auto" unmountOnExit>
                    <List>
                        <RefinementList
                            attribute="support.title"
                            sortBy={['name:asc']}
                        />
                    </List>
                </Collapse>

                {/* FUNDING DROP DOWN */}
                <ListItemButton onClick={handleFundingClick}>
                    <ListItemText primary="Funding Type" />
                    {fundingOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={fundingOpen} timeout="auto" unmountOnExit>
                    <List>
                        <RefinementList
                            attribute="funding.title"
                            sortBy={['name:asc']}
                        />
                    </List>
                </Collapse>

                {/* ENTREPRENEUR DROP DOWN */}
                <ListItemButton onClick={handleEntrepreneurClick}>
                    <ListItemText primary="Entrepreneur" />
                    {entrepreneurOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={entrepreneurOpen} timeout="auto" unmountOnExit>
                    <List>
                        <RefinementList
                            attribute="entrepreneur_title"
                            sortBy={['name:asc']}
                        />
                    </List>
                </Collapse>

                <List>
                    {/* ORGANIZATION DROP DOWN */}
                    <ListItemButton onClick={handleCategoryClick}>
                        <ListItemText primary="Organization" />
                        {categoryOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={categoryOpen} timeout="auto" unmountOnExit>
                        <List>
                            <RefinementList
                                attribute="organization_name"
                                sortBy={['name:asc']}
                            />
                        </List>
                    </Collapse>




                </List>
            </Paper>
            {user.id && titles.length > 0 &&
                <Paper sx={{ width: { xs: "100%" }, mr: { sm: 2 }, px: 2, py: 2, mt: 2 }}>
                    <Grid item xs={12}>
                        <Typography variant="caption">Select To-Do List</Typography>
                        <ListItemButton onClick={handleTitleClick}>
                            <ListItemText primary={`${user.username}'s Lists`} />
                            {titleOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={titleOpen} timeout="auto" unmountOnExit>
                            {titles &&
                                titles.map(list => (
                                    <ListItemButton key={list.id} onClick={() => { fetchTodo(list.id) }}>
                                        {currentList === list.id ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
                                        <ListItemText sx={{ ml: 1 }} primary={list.title} />
                                    </ListItemButton>
                                ))}
                        </Collapse>
                    </Grid>
                </Paper>
            }
        </Grid>
    );
}
