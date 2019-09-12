import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

import LeagueCard from './LeagueCard';
import LeagueInfo from './LeagueInfo';
import { fetchThing } from '../../utils';

const useStyles = makeStyles({
  container: {
    display: 'flex',
  }
});

const Dashboard = () => {
  const classes = useStyles();
  const [leagues, setLeagues] = useState(null);
  const [selectedLeagueId, setSelectedLeagueId] = useState(null);
  
  useEffect(() => {
    async function fetchLeagues() {
      const response = await fetchThing('leagues');
      setLeagues(response);
    }
    fetchLeagues();
  }, []);

  const renderLeagueCards = () => (
    leagues ?
    leagues.map(league => {
      return (
        <LeagueCard
          data={league}
          key={league.id}
          onSelect={(id) => { setSelectedLeagueId(id) }} />
      )
    }) :
    []
  );

  const renderLeagueInfo = () => (
    <LeagueInfo
      id={selectedLeagueId}
      clearSelection={() => setSelectedLeagueId(null)} />
  );

  return (
    <Container className={classes.container}>
       {selectedLeagueId ? renderLeagueInfo() : renderLeagueCards() }
    </Container>
  );
}

export default Dashboard