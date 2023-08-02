import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, TextField, DialogActions, Button, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';




function RegisterForm({ handleOpen, handleClose, openLoginModal, handleOpenRegister, setOpenRegisterModal, openRegisterModal, handleCloseRegister, setOpenLoginModal }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const todo = useSelector(store => store.todoListResourcesReducer)
  const dispatch = useDispatch();
  // import use history
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    console.log({
      user: {
        username: username,
        password: password
      },
      todo
    })

    dispatch({
      type: 'REGISTER',
      payload: {
        user: {
          username: username,
          password: password
        },
        todo
      },
    });
    handleCloseRegister();
    handleClose();
    history.push('/#/home')
  }; // end registerUser

  return (
    <>
      {openLoginModal ? (
        <LoginPage handleClose={handleClose}
          handleOpen={handleOpen}
          setOpenLoginModal={setOpenLoginModal}
        />
      ) :

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
                  handleCloseRegister();
                  handleOpen();
                }}
              >
                Login
              </Button>
              <Button onClick={registerUser} type="submit" name="submit" value="Register">Register</Button>
            </DialogActions>
          </Dialog>
        </div>
      }
    </>
  );
}

export default RegisterForm;
