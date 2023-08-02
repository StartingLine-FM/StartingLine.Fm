import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material';
import { useState } from 'react';
import Nav from './Shared/Nav/Nav';
import Footer from './Shared/Footer/Footer';
import ProtectedRoute from './Shared/ProtectedRoute/ProtectedRoute';
import AboutPage from './Pages/AboutPage/AboutPage';
import UserPage from './Pages/UserPage/UserPage';
import LandingPage from './Pages/LandingPage/LandingPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import CalendarPage from './Pages/CalendarPage/CalendarPage';
import ToDoList from './Pages/ToDoList/ToDoList';
import AnonToDo from './Pages/ToDoList/AnonToDo';
import AdminPage from './Pages/AdminPage/AdminPage';
import './App.css';
import { useHistory } from 'react-router-dom';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#55c6f0',
    },
    secondary: {
      main: '#fb5745',
    },
    background: {
      paper: '#fff9f2',
      default: '#fff9f2',
    },
    error: {
      main: '#b03c30',
    },
    text: {
      primary: '#1d1e1e',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 800,
  },
});

function App() {
  const dispatch = useDispatch();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  // init use history
  const handleCloseRegister = () => {
    setOpenRegisterModal(false);
  }
  const handleOpenRegister = () => {
    setOpenRegisterModal(true);
  }

  const handleOpen = () => {
    setOpenLoginModal(true)
  }

  const handleClose = () => {
    setOpenLoginModal(false)
  }
  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Nav openLoginModal={openLoginModal} setOpenLoginModal={setOpenLoginModal} handleOpen={handleOpen} />
          <LoginPage openLoginModal={openLoginModal}
                  setOpenLoginModal={setOpenLoginModal}
                  handleOpen={handleOpen} handleClose={handleClose} openRegisterModal={openRegisterModal} 
                  setOpenRegisterModal={setOpenRegisterModal} 
                  handleCloseRegister={handleCloseRegister} 
                  handleOpenRegister={handleOpenRegister} />
                  
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>
            <Route
              // shows CalendarPage at all times (logged in or not)
              exact
              path="/calendar"
            >
              <CalendarPage />
            </Route>
            <Route
              // shows CalendarPage at all times (logged in or not)
              exact
              path="/anonlist"
            >
              <AnonToDo  openLoginModal={openLoginModal}
                  setOpenLoginModal={setOpenLoginModal}
                  handleOpen={handleOpen} handleClose={handleClose} 
                  openRegisterModal={openRegisterModal} 
                  setOpenRegisterModal={setOpenRegisterModal} 
                  handleCloseRegister={handleCloseRegister} 
                  handleOpenRegister={handleOpenRegister} />
            </Route>

            <ProtectedRoute exact path="/todolist"
            >
              <ToDoList />
            </ProtectedRoute>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              <UserPage />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows AdminPage else shows LoginPage
              exact
              path="/admin"
            >
              <AdminPage />
            </ProtectedRoute>

            <Route
              exact
              path="/login"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the login page
                <LoginPage openLoginModal={openLoginModal}
                  setOpenLoginModal={setOpenLoginModal}
                  handleOpen={handleOpen} handleClose={handleClose} 
                  openRegisterModal={openRegisterModal} 
                  setOpenRegisterModal={setOpenRegisterModal} 
                  handleCloseRegister={handleCloseRegister} 
                  handleOpenRegister={handleOpenRegister} />
              }
            </Route>

            <Route
              exact
              path="/registration"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the registration page
                <RegisterPage openLoginModal={openLoginModal} handleClose={handleClose} handleOpen={handleOpen} openRegisterModal={openRegisterModal} 
                setOpenRegisterModal={setOpenRegisterModal}
                setOpenLoginModal={setOpenLoginModal} 
                handleCloseRegister={handleCloseRegister} 
                handleOpenRegister={handleOpenRegister}  />
              }
            </Route>

            <Route
              exact
              path="/home"
            >
              {/* {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page */}
              <LandingPage />
              {/* } */}
            </Route>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          {/* <Footer /> */}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
