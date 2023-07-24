import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@mui/material';

function AdminPage() {
  const [newResource, setNewResource] = useState({
    name: '',
    image_url: '',
    description: '',
    website: '',
    email: '',
    address: '',
    linkedin: ''
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
      linkedin: ''
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
        <Button variant="contained" color="primary" type="submit">Add Resource</Button>
      </form>
    </div>
  );
}

export default AdminPage;