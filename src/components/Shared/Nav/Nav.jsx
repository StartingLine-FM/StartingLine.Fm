import React from 'react';
import { AppBar, Typography, Link, Button, ButtonGroup, Grid } from '@mui/material';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
// import history
import { useHistory } from 'react-router-dom';


function Nav({ handleOpen }) {
  const user = useSelector((store) => store.user);

  const history = useHistory();

  return (
    <AppBar color="background" position="sticky" >
      <Grid container sx={{
        display: "flex",
        justifyContent: "space-between",
      }}>
        <Grid item>
          <Link underline='none' href="/#/home">
            <Typography sx={{ my: 2, mx: 4 }} variant="h3" variantMapping={{ h3: 'h1' }}>StartingLine.FM</Typography>
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
                <Button onClick={() => history.push("/#/home")} variant="contained">
                  Home
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
            <Button onClick={() => history.push('/about')} variant="contained">

              About

            </Button>
            <Button onClick={() => history.push('/calendar')} variant="contained">
              Calendar
            </Button>
            {user.id
              ? <Button onClick={() => history.push('/todolist')} variant="contained">
                Todo List
              </Button >
              : <Button onClick={() => history.push('/anonlist')} variant="contained">
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
