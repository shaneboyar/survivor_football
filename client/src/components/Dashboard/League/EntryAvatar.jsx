import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles({
  eliminatedAvatar: {
    margin: 10,
    cursor: 'pointer'
  },
  eliminatedImageAvatar: {
    margin: 10,
    opacity: 0.3,
    cursor: 'pointer'
  },
  avatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
    cursor: 'pointer'
  }
});

const EntryAvatar = ({ entry }) => {
  const classes = useStyles();

  const _renderFirstLetter = () => {
    if (entry.name) {
      return entry.name[0];
    } else {
      return entry.email[0];
    }
  }

  if (entry.image) {
    return (
      <Tooltip disableFocusListener title={entry.name || entry.email}>
        <Avatar
          alt={entry.name || entry.email}
          src={entry.image}
          className={entry.eliminated ? classes.eliminatedImageAvatar : classes.avatar} />
      </Tooltip>
    );
  } else {
    return (
      <Tooltip disableFocusListener title={entry.name || entry.email}>
        <Avatar
          alt={entry.name || entry.email}
          className={entry.eliminated ? classes.eliminatedAvatar : classes.avatar} >
          {_renderFirstLetter()}
        </Avatar>
      </Tooltip>
    );
  }
}

export default EntryAvatar;