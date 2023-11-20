import React from 'react';
import { AppBar, Typography, Link, Button, ButtonGroup, Grid } from '@mui/material';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
// import history
import { useHistory } from 'react-router-dom';


function Nav({ handleOpen, setOpenRegisterModal }) {
  const user = useSelector((store) => store.user);
  const errors = useSelector((store) => store.errors);

  const history = useHistory();

  return (
    <AppBar color="background" position="sticky" >
      {errors.registrationMessage && setOpenRegisterModal(true)}
      {errors.loginMessage && handleOpen()}
      <Grid container sx={{
        display: "flex",
        justifyContent: "space-between",
      }}>
        <Grid item>
          {/*StartingLine.FM Banner that also acts as a HOME Button*/}
          <Link underline='none' href="/#/home">
            <Typography sx={{ my: 2, mx: 4 }} variant="h3" variantMapping={{ h3: 'h1' }}>StartingLine.FM</Typography>
          </Link>
        </Grid>
        <Grid item sx={{ m: 3 }}>
          <ButtonGroup>

            {/*HOME BUTTON*/}
            <Button onClick={() => history.push("/#/home")} variant="contained">
              Home
            </Button>

            {/*ADMIN BUTTON IF LOGGED IN AS ADMIN*/}
            {user.admin && (
              <Button onClick={() => history.push("/admin")} variant="contained">
                Admin
              </Button>
            )}

            {/*ARTICLES BUTTON IF LOGGED IN AS ADMIN*/}
            {user.admin && (
              <Button onClick={() => history.push("/articles")} variant="contained">
                Articles
              </Button>
            )}

            {/*CALENDAR BUTTON*/}
            <Button onClick={() => history.push('/calendar')} variant="contained">
              Calendar
            </Button>

            {/*TO-DO LIST BUTTON*/}
            {user.id
              ? <Button onClick={() => history.push('/todolist')} variant="contained">
                To-do List
              </Button >
              : <Button onClick={() => history.push('/anonlist')} variant="contained">
                  To-do List
              </Button>
            }

            {/*ABOUT BUTTON*/}
            <Button onClick={() => history.push('/about')} variant="contained">
              About
            </Button>

            {/* If there's no user, show login/registration links */}
            {!user.id && (
              <>
                <Button variant="contained" onClick={handleOpen} >
                  Login / Register
                </Button>
              </>
            )}

            {/* If a user is logged in, show logout instead */}
            {user.id && (
              <>
                <LogOutButton />
              </>
            )}
          </ButtonGroup>
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default Nav;
