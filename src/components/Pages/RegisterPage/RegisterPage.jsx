import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from './RegisterForm';
// mui imports
import { Container, } from '@mui/material';

function RegisterPage({ handleClose, handleOpen, handleOpenRegister, setOpenRegisterModal, openRegisterModal, handleCloseRegister, openLoginModal }) {

  return (
    <Container>
      <RegisterForm
        handleClose={handleClose}
        handleOpen={handleOpen} 
        openLoginModal={openLoginModal}
        handleOpenRegister={handleOpenRegister}
        openRegisterModal={openRegisterModal}
        handleCloseRegister={handleCloseRegister}
        setOpenRegisterModal={setOpenRegisterModal}
      />
    </Container>
  );
}


export default RegisterPage;
