import React, { useState } from 'react';
import {Typography, makeStyles, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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
  }
}));

const Login = ({onLogin, onToggle}) => {
  const classes = useStyles();
  const [values, setValues] = useState({ email: '', password: ''})

  const _handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const _handleLogin = () => {
    fetch("http://localhost:3001/users/sign_in", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Expose-Headers': '*'
      },
      body: JSON.stringify(values)
    })
    .then(response => {
      const accessToken = response.headers.get('Access-Token');
      const expireAt = response.headers.get('Expire-At');
      const refreshToken = response.headers.get('Refresh-Token')
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('expireAt', expireAt * 1000);
      localStorage.setItem('refreshToken', refreshToken);
      onLogin()
    })
    .catch(error => console.log("error: ", error))
  }

  return (
    <>
      <Typography variant="h2">Log In</Typography>
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
        <Button variant="contained" className={classes.button} onClick={_handleLogin}>
          Submit
        </Button>
        </form>
        <Button color="primary" className={classes.button} onClick={onToggle}>
          Sign Up
        </Button>
      </div>
    </>
  )
}

export default Login;