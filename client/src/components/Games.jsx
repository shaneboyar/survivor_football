import React, { useState, useEffect } from 'react';
import {Container, Typography, makeStyles, CircularProgress } from '@material-ui/core';
import _ from 'lodash';
import WeekTable from './WeekTable';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

const renderWeeks = (games, weekNumber) => (
  <div key={weekNumber}>
    <Typography variant="h3">{`Week ${weekNumber}`}</Typography>
    <WeekTable data={games} />
  </div>
)


const Games = ({ setCurrentWeekId }) => {
  const classes = useStyles();
  const [games, setGames] = useState(null);

  const _fetchGames = () => {
    const authToken = localStorage.getItem('accessToken');
    fetch("/api/v1/games", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Expose-Headers': '*',
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      const gamesByWeek = _.groupBy(data, (game) => game.weekNumber)
      const firstUnplayedGame = _.find(data, game => !game.final);
      setCurrentWeekId(firstUnplayedGame.weekId);
      setGames(gamesByWeek)
    })
    .catch(error => console.log("error: ", error))
  }

  useEffect(() => _fetchGames(), [])

  return (
    <Container>
      <Typography variant="h2">Games</Typography>
      <div>
        {
         games ?
         <ol>
           {_.map(games, (games, weekNumber) => renderWeeks(games, weekNumber))}
         </ol> :
         <CircularProgress className={classes.progress} />
        }
      </div>
    </Container>
  )
}

export default Games;