import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {AppBar, Tabs, Tab, Typography, makeStyles, Box, Container, TextField, Button } from '@material-ui/core';


function TabPanel(props) {
  const { children, tab, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={tab !== index}
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
  tab: PropTypes.any.isRequired,
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
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function App() {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [values, setValues] = useState({ email: '', password: '', password_confirmation: ''})

  const _handleTabChange = (event, newTab) => {
    setTab(newTab);
  }

  const _handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const _handleRegister = () => {
    fetch("http://localhost:3001/users/sign_up", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    })
    .then(response => {
      const accessToken = response.headers.get('Access-Token');
      localStorage.setItem('accessToken', accessToken);
      setLoggedIn(true)
    })
    .catch(error => console.log("error: ", error))
  }

  return (
    <div className={classes.root}>
      { loggedIn ? 
      <Container>
        <AppBar position="static">
          <Tabs
            variant="fullWidth"
            tab={tab}
            onChange={_handleTabChange}
            aria-label="nav tabs example"
          >
            <LinkTab label="Page One" href="/drafts" {...a11yProps(0)} />
            <LinkTab label="Page Two" href="/trash" {...a11yProps(1)} />
            <LinkTab label="Page Three" href="/spam" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel tab={tab} index={0}>
          Page One
        </TabPanel>
        <TabPanel tab={tab} index={1}>
          Page Two
        </TabPanel>
        <TabPanel tab={tab} index={2}>
          Page Three
        </TabPanel>
      </Container> :
      <Container>
        <Typography variant="h2">Login</Typography>
        <div>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="outlined-name"
            label="Email"
            className={classes.textField}
            value={values.email}
            onChange={_handleChange('email')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-password"
            label="Password"
            className={classes.textField}
            value={values.password}
            onChange={_handleChange('password')}
            margin="normal"
            variant="outlined"
            type="password"
          />
          <TextField
            id="outlined-password-confirmation"
            label="Password Confirmation"
            className={classes.textField}
            value={values.password_confirmation}
            onChange={_handleChange('password_confirmation')}
            margin="normal"
            variant="outlined"
            type="password"
          />
          <Button variant="contained" className={classes.button} onClick={_handleRegister}>
            Sign Up
          </Button>
          </form>
        </div>
      </Container>
    }
    </div>
  );
}