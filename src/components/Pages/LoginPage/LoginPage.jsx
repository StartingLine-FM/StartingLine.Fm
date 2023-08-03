import React from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';
// material ui imports 
import { Container, Paper, Button } from '@mui/material';

function LoginPage({ handleOpen, openRegisterModal, setOpenRegisterModal, handleCloseRegister, handleOpenRegister, setOpenLoginModal, openLoginModal, handleClose }) {
  const history = useHistory();

  return (
    // pass in the form component and the props to access the login and register modal
    <Container>
      <LoginForm handleOpen={handleOpen} openRegisterModal={openRegisterModal} setOpenRegisterModal={setOpenRegisterModal} 
      handleCloseRegister={handleCloseRegister} handleOpenRegister={handleOpenRegister} openLoginModal={openLoginModal} handleClose={handleClose} setOpenLoginModal={setOpenLoginModal}  />
    </Container>
  );
}

export default LoginPage;
