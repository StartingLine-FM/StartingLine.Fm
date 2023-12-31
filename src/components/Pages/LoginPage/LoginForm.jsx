import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// material ui imports
import { IconButton, Typography, Dialog, Button, DialogTitle, DialogContent, DialogActions, TextField, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import register page
import RegisterPage from '../RegisterPage/RegisterPage';

function LoginForm({ handleClose, openLoginModal, handleOpen,
  openRegisterModal, setOpenRegisterModal, handleOpenRegister }) {
  // set state for the user and the password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const user = useSelector(store => store.user);
  const dispatch = useDispatch(); // initialize use dispatch
  const history = useHistory(); // initialize use history


  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          user: {
            username: username,
            password: password
          }
        },
      });
      // dispatches for when a user logs in
      dispatch({ type: "FETCH_USER" })
      // clear to-do list titles
      dispatch({ type: "FETCH_TABLE_LISTS" })
      // clear thier todo list resources
      dispatch({ type: "CLEAR_TODO_RESOURCES" })
      history.push('/#/login') // push them to the home screen
      handleClose(); // close the modal
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }

  }; // end login



  return (
    <>
      {/* if the register modal is open show this component */}
      {openRegisterModal ? (
        <RegisterPage handleClose={handleClose}
          handleOpen={handleOpen}
          openRegisterModal={openRegisterModal}
          setOpenRegisterModal={setOpenRegisterModal}
          handleCloseRegister={() => setOpenRegisterModal(false)}
        />
      ) :
        // otherwise show this component or components
        <div>
          <Dialog onClose={handleClose} open={openLoginModal}>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              Login
              <IconButton onClick={() => { dispatch({ type: 'CLEAR_LOGIN_ERROR' }); handleClose(); }} aria-label={'delete'}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent>
              {errors.loginMessage && (
                <Typography className="alert" role="alert">
                  {errors.loginMessage}
                </Typography>
              )}
              <TextField
                variant='standard'
                type="text"
                label="username"
                sx={{ mr: 1 }}
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
              <Typography variant="body2"> Don't have an account? </Typography>
              <Link
                // on click close the login modal and open the register modal
                onClick={() => { handleClose(); handleOpenRegister(); }}
                sx={{ px: 1 }}
              >
                Sign up.
              </Link>
              {/* on click login the user */}
              <Button
                onClick={login}
                variant="contained"
                type="submit"
                name="submit"
                value="Log In">Log In</Button>
            </DialogActions>

          </Dialog>
        </div>
      }
    </>
  );
}

export default LoginForm;




