import React from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';
// material ui imports 
import { Container, Paper, Button } from '@mui/material';

function LoginPage({ handleOpen, setOpenLoginModal, openLoginModal, handleClose }) {
  const history = useHistory();

  return (
    <Container>
      <LoginForm openLoginModal={openLoginModal} handleClose={handleClose} setOpenLoginModal={setOpenLoginModal}  />
    </Container>
  );
}

export default LoginPage;
