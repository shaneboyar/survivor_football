import React, { useState, useEffect } from 'react';
import {Typography, makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));



const Teams = () => {
  const classes = useStyles();
  const [teams, setTeams] = useState(null);

  const _fetchTeams = () => {
    const authToken = localStorage.getItem('accessToken');
    fetch("http://localhost:3001/api/v1/teams", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Expose-Headers': '*',
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(response => response.json())
    .then(data => { setTeams(data) })
    .catch(error => console.log("error: ", error))
  }

  useEffect(() => _fetchTeams(), [])

  return (
    <>
      <Typography variant="h2">Teams</Typography>
      <div>
        {
         teams ?
         <ol>
           {teams.map(team => (<li key={team.id}>{team.name}</li>))}
         </ol> :
         <CircularProgress className={classes.progress} />
        }
      </div>
    </>
  )
}

export default Teams;