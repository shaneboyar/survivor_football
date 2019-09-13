import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

import LeagueCard from './LeagueCard';
import NewLeagueCard from './NewLeagueCard';
import League from './League';
import { fetchThing } from '../../utils';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
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

  const renderLeagueCards = () => {
    // Look into Material-UI grid?
    if (!leagues) return <NewLeagueCard />;

    const leagueCards = leagues.map(league => {
      return (
        <LeagueCard
          league={league}
          key={league.id}
          onSelect={(id) => { setSelectedLeagueId(id) }}
          onDelete={(response) => setLeagues(response)} />
      )
    })
    
    return [leagueCards, <NewLeagueCard key={'new'} onSave={(response) => setLeagues(response)} />]
  }
 ;
  const renderLeagueInfo = () => (
    <League
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