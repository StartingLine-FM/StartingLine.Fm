import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// material ui imports
import { Paper, IconButton, Typography, Dialog, Button, DialogTitle, DialogContent, DialogActions, DialogContentText, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import register page
import RegisterPage from '../RegisterPage/RegisterPage';
function LoginForm({ handleClose, openLoginModal, handleOpen,
  openRegisterModal, setOpenRegisterModal, handleCloseRegister, handleOpenRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // set state for dialog modal

  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();


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
      
      dispatch({ type: "FETCH_USER" })
      dispatch({ type: "FETCH_TABLE_LISTS"})
      dispatch({ type: "CLEAR_TODO_RESOURCES" })
      handleClose();
      history.push('/#/home')
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login



  return (
    <>
      {openRegisterModal ? (
        <RegisterPage handleClose={handleClose}
          openRegisterModal={openRegisterModal}
          setOpenRegisterModal={setOpenRegisterModal}
          handleCloseRegister={() => setOpenRegisterModal(false)}
        />
      ) :

        <div>
          <Dialog onClose={handleClose} open={openLoginModal}>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              Login
              <IconButton onClick={handleClose} aria-label={'delete'}>
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
                type="button"
                onClick={handleOpenRegister}
              >
                Register
              </Button>
              <Button onClick={login} type="submit" name="submit" value="Log In">Log In</Button>
            </DialogActions>
          </Dialog>
        </div>
      }
    </>
  );
}

export default LoginForm;




