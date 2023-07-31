import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

function LogOutButton(props) {
  const dispatch = useDispatch();

  const logoutDispatches = () => {
    dispatch({ type: 'LOGOUT' });
    dispatch({ type: 'CLEAR_TODO_RESOURCES' })
  }

  return (
    <Button
      variant='contained'
      // This Button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={logoutDispatches}
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
