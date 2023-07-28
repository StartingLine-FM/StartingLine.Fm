import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, TextField, DialogActions, Button, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';




function RegisterForm({ handleOpenRegister, setOpenRegisterModal, openRegisterModal, handleCloseRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  // import use history
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
      <div>
        <Dialog onClose={handleCloseRegister} open={openRegisterModal}>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Register
            <IconButton onClick={handleCloseRegister} aria-label={'delete'}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {errors.registrationMessage && (
              <Typography className="alert" role="alert">
                {errors.registrationMessage}
              </Typography>
            )}
            <TextField
              variant='standard'
              type="text"
              label="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
              variant='standard'
              type="password"
              label="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
          <Button
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
          <Button onClick={registerUser} type="submit" name="submit" value="Register">Register</Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}

export default RegisterForm;
