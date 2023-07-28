import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from './RegisterForm';
// mui imports
import { Container, Paper, Button } from '@mui/material';

function RegisterPage({ handleOpenRegister, setOpenRegisterModal, openRegisterModal, handleCloseRegister}) {
  const history = useHistory();

  return (
    <Container>
      <RegisterForm openRegisterModal={openRegisterModal} handleCloseRegister={handleCloseRegister} setOpenRegisterModal={setOpenRegisterModal} />
    </Container>
  );
}

export default RegisterPage;
