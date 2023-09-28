import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RegisterForm from './RegisterForm';
// mui imports
import { Container, } from '@mui/material';

function RegisterPage({ handleClose, handleOpen, handleOpenRegister, setOpenRegisterModal, openRegisterModal, handleCloseRegister, openLoginModal }) {

  const errors = useSelector(store => store.errors);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <Container>
      {errors.registrationMessage && (setOpenRegisterModal(true) && dispatch({ type: 'CLEAR_LOGIN_ERROR' }))}
      {/* pass in the form component and the props for the form */}
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
