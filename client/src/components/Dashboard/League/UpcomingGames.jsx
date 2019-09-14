import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Badge,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import TrophyIcon from '@material-ui/icons/EmojiEvents';
import { green } from '@material-ui/core/colors'
import moment from 'moment';

import PickCreator from './PickCreator';

import { fetchThing, deleteThing } from '../../../utils';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  headline: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: '8px'
  },
  table: {
    minWidth: 650,
  },
  final: {
    opacity: 0.3
  },
  today: {
    backgroundColor: green[400]
  },
  winner: {
    fontWeight: 'bold',
  },
  verticallyCenterCell: {
    display: 'flex',
    alignItems: 'center'
  },
  deleteButton: {
    cursor: 'pointer'
  },
  pickPop: {
    display: 'flex',
    alignItems: 'center'
  }
}));


const UpcomingGames = ({ league, userEntries, currentWeekId }) => {
  const classes = useStyles();
  const [userPicks, setUserPicks] = useState([]);
  const [games, setGames] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchWeekGames() {
      const response = await fetchThing('games', null, [['weeks', currentWeekId]]);
      setGames(response);
    }
    fetchWeekGames();
  }, []);

  useEffect(() => {
    async function fetchUserPicks() {
      const userEntryIds = userEntries.map(entry => entry.id).join();
      const response = await fetchThing(
        'picks',
        null,
        [['leagues', league.id], ['entries', userEntryIds], ['weeks', currentWeekId]]);
      setUserPicks(response);
    }
    fetchUserPicks();
  }, []);

  const _deletePick = async(pickId, entryId) => {
    const response = await deleteThing(
      "picks",
      pickId,
      [['leagues', league.id], ['entries', entryId], ['weeks', currentWeekId]]
    );
    return response;
  }

  const pickedTeamIds = userPicks && userPicks.map((pick) => pick.teamId);
  const pickedTimes = (teamId) => {
    return pickedTeamIds.reduce((n, x) => n + (x === teamId), 0);
  }
  const picksByTeamId = (teamId) => {
    return userPicks.filter(pick => pick.teamId === teamId)
  }

  const remainingPicks = userEntries.filter(entry => !entry.eliminated).length - userPicks.length;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.headline}>
          <Typography variant="h3">Upcoming Week</Typography>
          <Typography>{`Your remaining picks: ${remainingPicks}`}</Typography>
        </div>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Start Time</TableCell>
              <TableCell>Home</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Away</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Pick</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games && games.map(row => {
              return (
                <TableRow key={row.id} className={[row.final && classes.final, moment().isSame(moment(row.startTime), 'day') && classes.today].join(' ')}>
                  <TableCell component="th" scope="row">
                    {moment(row.startTime).format("ddd MMM D, YY @ h:mm a")}
                  </TableCell>
                  <TableCell>
                    <Tooltip
                      disableHoverListener={!pickedTeamIds.includes(row.homeTeamId)}
                      disableFocusListener
                      disableTouchListener
                      interactive
                      title={
                        pickedTeamIds.includes(row.homeTeamId) ?
                        picksByTeamId(row.homeTeamId).map(pick => {
                          return (
                            <div key={pick.id} className={classes.pickPop}>
                              <DeleteIcon
                                aria-label="delete"
                                className={classes.deleteButton}
                                onClick={async() => {
                                  if(window.confirm("delete?")) {
                                    const picks = await _deletePick(pick.id, pick.entryId);
                                    setUserPicks(picks);
                                  }
                                }} />
                              {pick.entryName}
                            </div>
                          )
                        }) :
                        ""
                      }>    
                      <Badge
                        color="secondary"
                        overlap="circle"
                        invisible={!pickedTeamIds.includes(row.homeTeamId)}
                        badgeContent={`${pickedTimes(row.homeTeamId)}`}>
                        <Typography className={classes.verticallyCenterCell}>
                          {row.homeTeamName}{row.winner === row.homeTeamName && <TrophyIcon />}
                        </Typography>
                      </Badge>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{row.homeTeamScore}</TableCell>
                  <TableCell>
                  <Tooltip
                      disableHoverListener={!pickedTeamIds.includes(row.awayTeamId)}
                      disableFocusListener
                      disableTouchListener
                      interactive
                      title={
                        pickedTeamIds.includes(row.awayTeamId) ?
                        picksByTeamId(row.awayTeamId).map(pick => {
                          return (
                            <div key={pick.id} className={classes.pickPop}>
                              <DeleteIcon
                                aria-label="delete"
                                className={classes.deleteButton}
                                onClick={async() => {
                                  if(window.confirm("delete?")) {
                                    const picks = await _deletePick(pick.id, pick.entryId);
                                    setUserPicks(picks);
                                  }
                                }} />
                              {pick.entryName}
                            </div>
                          )
                        }) :
                        ""
                      }> 
                    <Badge
                      color="secondary"
                      overlap="circle"
                      invisible={!pickedTeamIds.includes(row.awayTeamId)}
                      badgeContent={`${pickedTimes(row.awayTeamId)}`}>
                        <Typography className={classes.verticallyCenterCell}>
                          {row.awayTeamName}{row.winner === row.awayTeamName && <TrophyIcon />}
                        </Typography>
                      </Badge>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{row.awayTeamScore}</TableCell>
                    <TableCell>
                      {
                        // new Date(row.startTime) > new Date() && 
                        <Button
                          disabled={remainingPicks < 1}
                          onClick={() => {
                            setSelectedGame(row)
                            setModalOpen(true)
                          }}>
                          Pick
                        </Button>
                      }
                    </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
      <PickCreator
        selectedGame={selectedGame}
        open={modalOpen}
        onSave={(picks) => {
          setUserPicks(picks);
          setModalOpen(false);
        }}
        closeModal={() => setModalOpen(false)}
        userPicks={userPicks}
        league={league} />
    </div>
  );
}

export default UpcomingGames;