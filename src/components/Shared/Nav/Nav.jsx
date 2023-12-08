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
      <Grid container justifyContent="space-between">
        <Grid item xs={6}>
          {/*StartingLine.FM Banner that also acts as a HOME Button*/}
          <Link underline='none' href="/#/home">
            <Typography sx={{ my: 2, mx: 4 }} variant="h4" variantMapping={{ h3: 'h1' }}>StartingLine.FM</Typography>
          </Link>
        </Grid>
        <Grid item container justifyContent={{ xs: "center", md: "space-around" }} xs={12} md={5} mb={{ xs: 3, md: 3 }} mt={{ xs: 0, md: 3 }} mx={{ xs: 2, md: 0 }}
          spacing={1}>

          {/*HOME BUTTON*/}
          <Grid item>
            <Button onClick={() => history.push("/#/home")} variant="text">
              Home
            </Button>
          </Grid>


          {/*ADMIN BUTTON IF LOGGED IN AS ADMIN*/}
          {user.admin && (
            <Grid item>
              <Button onClick={() => history.push("/admin")} variant="text">
                Admin
              </Button>
            </Grid>
          )}


          {/*ARTICLES BUTTON IF LOGGED IN AS ADMIN*/}
          {user.admin && (
            <Grid item>
              <Button onClick={() => history.push("/articles")} variant="text">
                Articles
              </Button>
            </Grid>
          )}


          {/*CALENDAR BUTTON*/}
          <Grid item>
            <Button onClick={() => history.push('/calendar')} variant="text">
              Calendar
            </Button>
          </Grid>
          {/*TO-DO LIST BUTTON*/}
          {user.id
            ?
            <Grid item>
              <Button onClick={() => history.push('/todolist')} variant="text">
                To-do List
              </Button >
            </Grid>
            :
            <Grid item>
              <Button onClick={() => history.push('/anonlist')} variant="text">
                To-do List
              </Button>
            </Grid>
          }

          {/*ABOUT BUTTON*/}
          <Grid item>
            <Button onClick={() => history.push('/about')} variant="text">
              About
            </Button>
          </Grid>

          {/* If there's no user, show login/registration links */}
          {!user.id && (
            <Grid item>
              <Button variant="text" onClick={handleOpen} >
                Login / Register
              </Button>
            </Grid>
          )}

          {/* If a user is logged in, show logout instead */}
          {user.id && (
            <Grid item>
              <LogOutButton />
            </Grid>
          )}
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default Nav;
