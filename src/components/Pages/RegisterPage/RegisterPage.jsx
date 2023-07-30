import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from './RegisterForm';
// mui imports
import { Container, Paper, Button } from '@mui/material';

function RegisterPage({ handleClose, handleOpenRegister, setOpenRegisterModal, openRegisterModal, handleCloseRegister}) {
  const history = useHistory();

  return (
    <Container>
      <RegisterForm handleClose={handleClose} handleOpenRegister={handleOpenRegister} openRegisterModal={openRegisterModal} handleCloseRegister={handleCloseRegister} setOpenRegisterModal={setOpenRegisterModal} />
    </Container>
  );
}

export default RegisterPage;
