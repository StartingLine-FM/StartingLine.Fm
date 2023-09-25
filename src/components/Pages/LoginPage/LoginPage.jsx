import React from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
// material ui imports 
import { Container } from '@mui/material';

function LoginPage({ handleOpen, openRegisterModal, setOpenRegisterModal, handleCloseRegister, handleOpenRegister, setOpenLoginModal, openLoginModal, handleClose }) {

  const history = useHistory();
  const errors = useSelector(store => store.errors);
  const user = useSelector(store => store.user);

  return (
    // pass in the form component and the props to access the login and register modal
    <Container>
      {errors.loginMessage ? handleOpen() : history.push('/home')}
      <LoginForm handleOpen={handleOpen} openRegisterModal={openRegisterModal} setOpenRegisterModal={setOpenRegisterModal}
        handleCloseRegister={handleCloseRegister} handleOpenRegister={handleOpenRegister} openLoginModal={openLoginModal} handleClose={handleClose} setOpenLoginModal={setOpenLoginModal} />
    </Container>
  );
}

export default LoginPage;
