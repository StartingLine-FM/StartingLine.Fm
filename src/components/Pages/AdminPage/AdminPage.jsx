import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function AdminPage() {
  const [newResource, setNewResource] = useState({
    name: '',
    image_url: '',
    description: '',
    website: '',
    email: '',
    address: '',
    linkedin: '',
    category: '',
    stage: ''
  });

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'POST_RESOURCE', payload: newResource });  //adjusted to 'POST_RESOURCE'
    setNewResource({
      name: '',
      image_url: '',
      description: '',
      website: '',
      email: '',
      address: '',
      linkedin: '',
      category: '',
      stage: ''
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={newResource.name}
          onChange={(event) => setNewResource({...newResource, name: event.target.value})}
        />
        <TextField
          label="Image URL"
          value={newResource.image_url}
          onChange={(event) => setNewResource({...newResource, image_url: event.target.value})}
        />
        <TextField
          label="Description"
          value={newResource.description}
          onChange={(event) => setNewResource({...newResource, description: event.target.value})}
        />
        <TextField
          label="Website"
          value={newResource.website}
          onChange={(event) => setNewResource({...newResource, website: event.target.value})}
        />
        <TextField
          label="Email"
          value={newResource.email}
          onChange={(event) => setNewResource({...newResource, email: event.target.value})}
        />
        <TextField
          label="Address"
          value={newResource.address}
          onChange={(event) => setNewResource({...newResource, address: event.target.value})}
        />
        <TextField
          label="LinkedIn"
          value={newResource.linkedin}
          onChange={(event) => setNewResource({...newResource, linkedin: event.target.value})}
        />
        <TextField
          select
          value={newResource.category_id}
          SelectProps={{
            native: true,
        }}
        // label="Choose Category"
        onChange={(event) => setNewResource({...newResource, category_id: event.target.value})}
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
        // label="Choose Stage"
        onChange={(event) => setNewResource({...newResource, stage_id: event.target.value})}
        >
          <option value={0}>Add Stage</option>
          <option value={1}>All</option>
          <option value={2}>Nascent</option>
          <option value={3}>Early Stage</option>
          <option value={4}>Startup/Seed</option>
          <option value={5}>Growth</option>

        </TextField>
        <Button variant="contained" color="primary" type="submit">Add Resource</Button>
      </form>
    </div>
  );
}

export default AdminPage;