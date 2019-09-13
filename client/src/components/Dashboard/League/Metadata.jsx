import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography
} from '@material-ui/core';
import EntryAvatar from './EntryAvatar';

const useStyles = makeStyles(theme => ({
  entries: {
    display: 'flex',
    flexWrap: 'wrap'
  },
}));

const Metadata = ({ league }) => {
  const classes = useStyles();
  return (
    <div>
      { league.userEntries &&
        <>
          <Typography variant="h3">Your Entries</Typography>
          <div className={classes.entries}>
            {league.userEntries.map((entry) => <EntryAvatar key={entry.id} entry={entry} />)}
          </div>
        </>
      }
      { league.otherEntries &&
        <>
          <Typography variant="h3">Everyone Else</Typography>
          <div className={classes.entries}>
            {league.otherEntries.map((entry) => <EntryAvatar key={entry.id} entry={entry} />)}
          </div>
        </>
      }
    </div>
    
  );
};

export default Metadata;