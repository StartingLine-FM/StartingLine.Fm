import React, { useState, useEffect } from 'react';
import "./AdminPage.css"
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Container, Box, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function AdminPage() {
  const [newResource, setNewResource] = useState({
    name: '',
    image_url: '',
    description: '',
    website: '',
    email: '',
    address: '',
    linkedin: '',
    category_id: '',
    stage_id: '',
  });

  const [newCategory, setNewCategory] = useState('');
  const [newStage, setNewStage] = useState('');
  // New state variables for tracking edited category and stage names
  const [editedCategoryName, setEditedCategoryName] = useState('');
  const [editedStageName, setEditedStageName] = useState('');

  const dispatch = useDispatch();
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  const categories = useSelector((state) => state.categories) || [];
  const stages = useSelector((state) => state.stages) || [];

  useEffect(() => {
    // Fetch categories and stages on component mount
    dispatch({ type: 'FETCH_CATEGORIES' });
    dispatch({ type: 'FETCH_STAGES' });
  }, [dispatch]);


  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation before dispatching the action
    if (newResource.name && newResource.description && newResource.stage_id && newResource.category_id) {
      dispatch({ type: 'POST_RESOURCE', payload: newResource });
      setNewResource({
        name: '',
        image_url: '',
        description: '',
        website: '',
        email: '',
        address: '',
        linkedin: '',
        category_id: '',
        stage_id: '',
      });
    } else {
      // Display a validation error message or take appropriate action
      alert('Please provide all mandatory fields (name, description, stage, and category).');
    }
  };

  const handleAddCategory = (event) => {
    event.preventDefault();
    dispatch({ type: 'POST_CATEGORY', payload: { name: newCategory } });
    setNewCategory('');
  };

  // Function to handle editing a category
  const handleEditCategory = (categoryId, currentName) => {
    setEditedCategoryName({ id: categoryId, name: currentName });
  };

  // Function to save the edited category name
  const handleSaveEditedCategory = (categoryId) => {
    // Call the API to update the category name in the backend
    dispatch({ type: 'UPDATE_CATEGORY', payload: { id: categoryId, name: editedCategoryName } });
  };

  // Function to cancel the edit for a category
  const handleCancelEditCategory = () => {
    setEditedCategoryName('');
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      dispatch({ type: 'DELETE_CATEGORY', payload: categoryId });
    }
  };


  const handleAddStage = (event) => {
    event.preventDefault();
    dispatch({ type: 'POST_STAGE', payload: { name: newStage } });
    setNewStage('');
  };

  // Function to handle editing a stage
  const handleEditStage = (stageId, currentName) => {
    setEditedStageName({ id: stageId, name: currentName });
  };

  // Function to save the edited category name
  const handleSaveEditedStage = (categoryId) => {
    // Call the API to update the category name in the backend
    dispatch({ type: 'UPDATE_STAGE', payload: { id: categoryId, name: editedCategoryName } });
  };

  // Function to cancel the edit for a stage
  const handleCancelEditStage = () => {
    setEditedStageName('');
  };




  const handleDeleteStage = (stageId) => {
    if (window.confirm('Are you sure you want to delete this stage?')) {
      dispatch({ type: 'DELETE_STAGE', payload: stageId });
    }
  };

  return (
    <Box className='style-box'>
      <Container className='admin-container'>
         {/* Title for the whole page */}
         <h1 style={{ textAlign: 'center' }}>Admin</h1>
        {/* Form to add a new resource */}
        <form className='admin-form' onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={newResource.name}
            onChange={(event) => setNewResource({ ...newResource, name: event.target.value })}
            required // This makes the field mandatory
          />
          <TextField
            label="Image URL"
            value={newResource.image_url}
            onChange={(event) => setNewResource({ ...newResource, image_url: event.target.value })}
          />
          <TextField
            label="Description"
            value={newResource.description}
            onChange={(event) => setNewResource({ ...newResource, description: event.target.value })}
            required // This makes the field mandatory
          />
          <TextField
            label="LinkedIn"
            value={newResource.linkedin}
            onChange={(event) => setNewResource({ ...newResource, linkedin: event.target.value })}
            // Validate the LinkedIn URL using the regex
            // A valid LinkedIn URL starts with "https://www.linkedin.com/"
            error={!urlRegex.test(newResource.linkedin) && newResource.linkedin !== ''}
            helperText={newResource.linkedin !== '' && !urlRegex.test(newResource.linkedin) ? 'Invalid LinkedIn URL' : ''}
          />

          <TextField
            label="Website"
            value={newResource.website}
            onChange={(event) => setNewResource({ ...newResource, website: event.target.value })}
            // Validate the Website URL using the regex
            // A valid Website URL starts with "http://" or "https://"
            error={!urlRegex.test(newResource.website) && newResource.website !== ''}
            helperText={newResource.website !== '' && !urlRegex.test(newResource.website) ? 'Invalid Website URL' : ''}
          />
          <TextField
            label="Email"
            type="email"
            value={newResource.email}
            onChange={(event) => setNewResource({ ...newResource, email: event.target.value })}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" // Regular expression for email validation
          />
          <TextField
            label="Address"
            value={newResource.address}
            onChange={(event) => setNewResource({ ...newResource, address: event.target.value })}
          />
          <TextField
            select
            value={newResource.category_id}
            SelectProps={{
              native: true,
            }}
            onChange={(event) => setNewResource({ ...newResource, category_id: event.target.value })}
            required // This makes the field mandatory
          >
            <option value={0}>Pick Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </TextField>
          <TextField
            select
            value={newResource.stage_id}
            SelectProps={{
              native: true,
            }}
            onChange={(event) => setNewResource({ ...newResource, stage_id: event.target.value })}
            required // This makes the field mandatory
          >
            <option value={0}>Pick Stage</option>
            {stages.map((stage) => (
              <option key={stage.id} value={stage.id}>
                {stage.name}
              </option>
            ))}
          </TextField>
          <Button variant="contained" color="primary" type="submit">
            Add Resource
          </Button>
        </form>

        {/* Form to add a new category */}
        <form className="admin-form" onSubmit={handleAddCategory}>
          <TextField
            label="New Category"
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Add Category
          </Button>
        </form>

        {/* Form to add a new stage */}
        <form className="admin-form" onSubmit={handleAddStage}>
          <TextField
            label="New Stage"
            value={newStage}
            onChange={(event) => setNewStage(event.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Add Stage
          </Button>
        </form>
        {/* Display existing categories */}
        <div>
          {/* Title for categories */}
          <h2 style={{ textAlign: 'center' }}>Categories</h2>
          <ul className="admin-list">
            {categories.map((category) => (
              <li key={category.id}>
                {editedCategoryName && category.id === editedCategoryName.id ? (
                  // Show the input field for editing the category name
                  <TextField
                    value={editedCategoryName.name}
                    onChange={(event) =>
                      setEditedCategoryName({ ...editedCategoryName, name: event.target.value })
                    }
                  />
                ) : (
                  // Display the category name
                  <span>{category.name}</span>
                )}

                <div>
                  {editedCategoryName && category.id === editedCategoryName.id ? (
                    <>
                      <IconButton
                        color="primary"
                        aria-label="Save category"
                        onClick={() => handleSaveEditedCategory(category.id)}
                      >
                        <SaveIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        aria-label="Cancel edit category"
                        onClick={handleCancelEditCategory}
                      >
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton
                      color="primary"
                      aria-label="Edit category"
                      onClick={() => handleEditCategory(category.id, category.name)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                  <IconButton
                    color="secondary"
                    aria-label="Delete category"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Display existing stages */}
        <div>
          {/* Title for stages */}
          <h2 style={{ textAlign: 'center' }}>Stages</h2>
          <ul className="admin-list">
            {stages.map((stage) => (
              <li key={stage.id}>
                {editedStageName && stage.id === editedStageName.id ? (
                  // Show the input field for editing the stage name
                  <TextField
                    value={editedStageName.name}
                    onChange={(event) =>
                      setEditedStageName({ ...editedStageName, name: event.target.value })
                    }
                  />
                ) : (
                  // Display the stage name
                  <span>{stage.name}</span>
                )}

                <div>
                  {editedStageName && stage.id === editedStageName.id ? (
                    <>
                      <IconButton
                        color="primary"
                        aria-label="Save stage"
                        onClick={() => handleSaveEditedStage(stage.id)}
                      >
                        <SaveIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        aria-label="Cancel edit stage"
                        onClick={handleCancelEditStage}
                      >
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton
                      color="primary"
                      aria-label="Edit stage"
                      onClick={() => handleEditStage(stage.id, stage.name)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                  <IconButton
                    color="secondary"
                    aria-label="Delete stage"
                    onClick={() => handleDeleteStage(stage.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Box>
  );
}

export default AdminPage;