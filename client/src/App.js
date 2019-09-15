import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography, Box, Container} from '@material-ui/core';
import Login from './components/Login';
import Signup from './components/Signup';
import Games from './components/Games';
import Dashboard from './components/Dashboard';

import Snackbar from './components/Snackbar';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function App() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [signup, setSignUp] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeekId, setCurrentWeekId] = useState();

  const _refreshToken = (accessToken, refreshToken) => {
    fetch("/users/tokens", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Refresh-Token': refreshToken
      }
    })
    .then(response => {
      if (response.ok) {
        const accessToken = response.headers.get('Access-Token');
        const expireAt = response.headers.get('Expire-At');
        const refreshToken = response.headers.get('Refresh-Token')
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('expireAt', expireAt * 1000);
        localStorage.setItem('refreshToken', refreshToken);
        setLoggedIn(true);
      } else {
        return response.json()
      }
    })
    .catch(error => console.log("error: ", error))
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const expireAt = parseInt(localStorage.getItem('expireAt'));
    const accessExpired = new Date() > new Date(expireAt);

    if (accessToken && !accessExpired) {
      setLoggedIn(true);
    } else if (accessToken && accessExpired) {
      _refreshToken(accessToken, refreshToken)
    }
  }, [])

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  if (loggedIn) {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab label="Dashboard" {...a11yProps(0)} />
            <LinkTab label="Games" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Dashboard currentWeekId={currentWeekId} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Games setCurrentWeekId={setCurrentWeekId} />
        </TabPanel>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Container>
        { signup ? 
          <Signup
            onRegister={() => setLoggedIn(true)}
            onToggle={() => setSignUp(false)}
            onError={(errorMessage) => {
              setErrorMessage(errorMessage)
            }}
          /> : 
          <Login
            onLogin={() => setLoggedIn(true)}
            onToggle={() => setSignUp(true)}
            onError={(errorMessage) => {
              setErrorMessage(errorMessage)
            }}
          />
        }
        <Snackbar message={errorMessage} clearError={() => setErrorMessage(null)} />
        </Container>
      </div>
    );
  }
 
}