import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, TextField, DialogActions, Button, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';




function RegisterForm({ handleOpen, handleClose, openLoginModal, handleOpenRegister, setOpenRegisterModal, openRegisterModal, handleCloseRegister, setOpenLoginModal }) {
  // state for username and password in the form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  // grab the list in the store so that on register a user gets 
  // a list with their todo list resources attached
  const todo = useSelector(store => store.todoListResourcesReducer)
  // initalize use dispatch
  const dispatch = useDispatch();
  // import use history
  const history = useHistory();

  // register user funciton
  const registerUser = (event) => {
    event.preventDefault();

    console.log({ // show the user and their associated list and resources in the log
      user: {
        username: username,
        password: password
      },
      todo
    })

    dispatch({ // dispatch to register a user and the todo list
      type: 'REGISTER',
      payload: {
        user: {
          username: username,
          password: password
        },
        todo
      },
    });
    handleCloseRegister(); // close the register modal if it is open
    handleClose(); // close the login modal if it is open
    history.push('/#/home') // push them home.
  }; // end registerUser

  return (
    <>
      {/* if open modal is true, show this compoenent */}
      {openLoginModal ? (
        <LoginPage handleClose={handleClose}
          handleOpen={handleOpen}
          setOpenLoginModal={setOpenLoginModal}
        />
      ) :
        // otherwise show this component
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
              // on click close the register modal and open the login modal
                onClick={() => {
                  handleCloseRegister();
                  handleOpen();
                }}
              >
                Login
              </Button>
              {/* on click register the user */}
              <Button onClick={registerUser} type="submit" name="submit" value="Register">Register</Button>
            </DialogActions>
          </Dialog>
        </div>
      }
    </>
  );
}

export default RegisterForm;
