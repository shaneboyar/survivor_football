import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { fetchThing } from '../../utils';

const useStyles = makeStyles({
  container: {
    flexGrow: 1
  },
  headline: {
    display: 'flex',
  },
  backButton: {
    cursor: 'pointer'
  },
  leagueName: {
    flexGrow: 1,
    textAlign: 'center'
  }
});

const LeagueInfo = ({ id, clearSelection }) => {
  const classes = useStyles();
  const [league, setLeague] = useState(null);

  useEffect(() => {
    async function fetchLeague() {
      const response = await fetchThing('leagues', id);
      setLeague(response);
    }
    fetchLeague();
  }, []);

  if (league) {
    return (
      <Paper className={classes.container}>
        <div className={classes.headline}>
          <CloseIcon onClick={clearSelection} className={classes.backButton} />
          <Typography variant="h3" className={classes.leagueName}>{league.name}</Typography>
        </div>
      </Paper>
    )
  } else {
    return <CircularProgress className={classes.progress} />
  }

}

export default LeagueInfo;