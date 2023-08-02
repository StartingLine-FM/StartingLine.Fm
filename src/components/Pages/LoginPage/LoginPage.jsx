import React from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';
// material ui imports 
import { Container, Paper, Button } from '@mui/material';

function LoginPage({ handleOpen, openRegisterModal, setOpenRegisterModal, handleCloseRegister, handleOpenRegister, setOpenLoginModal, openLoginModal, handleClose }) {
  const history = useHistory();

  return (
    <Container>
      <LoginForm handleOpen={handleOpen} openRegisterModal={openRegisterModal} setOpenRegisterModal={setOpenRegisterModal} 
      handleCloseRegister={handleCloseRegister} handleOpenRegister={handleOpenRegister} openLoginModal={openLoginModal} handleClose={handleClose} setOpenLoginModal={setOpenLoginModal}  />
    </Container>
  );
}

export default LoginPage;
