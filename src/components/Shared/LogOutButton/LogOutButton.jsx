import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
// import use history
import { useHistory } from 'react-router-dom';

function LogOutButton(props) {
  const dispatch = useDispatch();
  // init use history
  const history = useHistory();
  const logoutDispatches = () => {
    dispatch({ type: 'LOGOUT' });
    dispatch({ type: 'CLEAR_TODO_RESOURCES' })
    history.push('/#/home')
  }

  return (
    <Button
      variant='text'
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
