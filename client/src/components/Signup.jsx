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

const Signup = ({onRegister, onToggle}) => {
  const classes = useStyles();
  const [values, setValues] = useState({ email: '', password: '', password_confirmation: ''})

  const _handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const _handleRegister = () => {
    fetch("http://localhost:3001/users/sign_up", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Expose-Headers': '*'
      },
      body: JSON.stringify(values)
    })
    .then(response => {
      const accessToken = response.headers.get('Access-Token');
      localStorage.setItem('accessToken', accessToken);
      onRegister()
    })
    .catch(error => console.log("error: ", error))
  }

  return (
    <>
      <Typography variant="h2">Sign Up</Typography>
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
          Submit
        </Button>
        </form>
        <Button color="primary" className={classes.button} onClick={onToggle}>
          Log In
        </Button>
      </div>
    </>
  )
}

export default Signup;