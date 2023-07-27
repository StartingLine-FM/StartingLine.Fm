import React, { useState } from 'react';
import "./AdminPage.css"
import { useDispatch } from 'react-redux';
import { TextField, Button, Container, Box } from '@mui/material';

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

  const dispatch = useDispatch();

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

   // Regular expression for validating URLs
   const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  return (
    <Box className='admin-page'>
    <Container className='admin-container'>
      <form onSubmit={handleSubmit}>
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
          <option value={0}>Add Category</option>
          <option value={1}>Government</option>
          <option value={2}>Funding Organization</option>
          <option value={3}>University</option>
          <option value={4}>Support Organization</option>
          <option value={5}>Service Provider</option>
          <option value={6}>Big Company</option>
          <option value={7}>Research Organization</option>
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
          <option value={0}>Add Stage</option>
          <option value={1}>All</option>
          <option value={2}>Nascent</option>
          <option value={3}>Early Stage</option>
          <option value={4}>Startup/Seed</option>
          <option value={5}>Growth</option>
        </TextField>
        <Button variant="contained" color="primary" type="submit">
          Add Resource
        </Button>
      </form>
    </Container>
    </Box>
  );
}

export default AdminPage;