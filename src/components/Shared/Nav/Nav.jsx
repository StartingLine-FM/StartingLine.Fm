import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar } from '@mui/material';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    paddingLeft: '-10px' }}>
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">StartingLine.FM</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <>
            <Link className="navLink" to="/login">
              Login / Register
            </Link>
            <Link className="navLink" to="/todolist">
              Todo List
            </Link>
          </>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/home">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            {user.admin && (
              <Link className="navLink" to="/admin">
                Admin Page
              </Link>
            )}

            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
        <Link className="navLink" to="/calendar">
          Calendar
        </Link>
      </div>
    </div>
    </AppBar>
  );
}

export default Nav;
