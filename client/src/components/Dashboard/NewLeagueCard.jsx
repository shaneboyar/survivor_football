import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Button,
  TextField
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { postThing } from '../../utils';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    minWidth: 275,
    minHeight: 275,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  closeIcon: {
    position: 'absolute',
    top: '15px',
    left: '15px',
    cursor: 'pointer'
  },
  textField: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  }
}));



const NewLeagueCard = ({ onSave }) =>  {
  const classes = useStyles();
  const [active, setActive] = useState(false);
  const [values, setValues] = useState({ name: '' })

  const _closeForm = () => {
    setActive(false);
    setValues({ name: '' });
  }

  const _handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const _saveLeague = async() => {
    const response = await postThing('leagues', values);
    _closeForm();
    return response;
  }

  return (
    <Card className={classes.card}>
      { active ?
        <div className={classes.form}>
          <CloseIcon className={classes.closeIcon} onClick={_closeForm} />
          <TextField
            id="outlined-name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={_handleChange('name')}
            margin="normal"
            variant="outlined"
          />
          <Button
            size="small"
            onClick={async() => {
              const leagues = await _saveLeague();
              onSave(leagues);
            }}>
              Submit
          </Button>
        </div> :
        <Button size="large" onClick={() => { setActive(true) }}>Create A New League</Button>
      }
    </Card>
  );
}

export default NewLeagueCard;