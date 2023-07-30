import React from 'react';
import { useState } from 'react';
import { AppBar, Typography, Link, Button, ButtonGroup, Grid } from '@mui/material';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import LoginPage from '../../Pages/LoginPage/LoginPage';



function Nav({ handleOpen}) {
  const user = useSelector((store) => store.user);

  return (
    <AppBar color="background" position="sticky" >
      <Grid container sx={{
        display: "flex",
        justifyContent: "space-between",
      }}>
        <Grid item>
          <Link underline='none' href="/#/home">
            <Typography sx={{ my: 2, mx: 4 }} variant="h3" variantMapping={"h1"}>StartingLine.FM</Typography>
          </Link>
        </Grid>
        <Grid item sx={{ m: 3 }}>
          <ButtonGroup>
            {/* If no user is logged in, show these links */}
            {!user.id && (
              // If there's no user, show login/registration links
              <>
                <Button variant="contained" onClick={handleOpen} >
                    Login / Register
                </Button>
              </>
            )}
            {/* If a user is logged in, show these links */}
            {user.id && (
              <>
                <Button variant="contained">
                  <Link sx={{ color: '#1d1e1e' }} underline='none' href="/#/home">
                    Home
                  </Link>
                </Button>

                {user.admin && (
                  <Button variant="contained">
                    <Link sx={{ color: '#1d1e1e' }} underline='none' href="/#/admin">
                      Admin Page
                    </Link>
                  </Button>
                )}
                <LogOutButton />
              </>
            )}
            <Button variant="contained">
              <Link sx={{ color: '#1d1e1e' }} underline='none' href="/#/about">
                About
              </Link>
            </Button>
            <Button variant="contained">
              <Link sx={{ color: '#1d1e1e' }} underline='none' href="/#/calendar">
                Calendar
              </Link>
            </Button>
            {user.id
              ? <Button variant="contained">
                <Link sx={{ color: '#1d1e1e' }} underline='none' href="/#/todolist">
                  Todo List
                </Link>
              </Button >
              : <Button  variant="contained">
                <Link sx={{ color: '#1d1e1e' }} underline='none' href="/#/anonlist">
                  Todo List
                </Link>
              </Button>
            }
          </ButtonGroup>
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default Nav;
