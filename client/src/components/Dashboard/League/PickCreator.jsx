import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import {
  Backdrop,
  Modal,
  Fade,
  Typography,
  Button,
  ButtonGroup
} from '@material-ui/core';
import _ from 'lodash';

import { fetchThing, postThing } from '../../../utils';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  toggleContainer: {
    margin: theme.spacing(2, 0),
  },
}));

const PickCreator = ({ onSave, selectedGame, userPicks, league, open, closeModal }) => {
  const classes = useStyles();
  const [userEntries, setUserEntries] = useState(null)
  const [selectedEntryId, setSelectedEntryId] = useState(null);

  useEffect(() => {
    async function fetchUserEntries() {
      const response = await fetchThing('entries', null, [['leagues', league.id]]);
      setUserEntries(response);
    }
    fetchUserEntries();
  }, []);
  
  if (!userEntries || !userPicks || !selectedGame) { return null }
  
  const entryIdsWithPick = userPicks.map(pick => pick.entryId);
  const userEntriesWithoutPicks = userEntries.filter(entry => !entryIdsWithPick.includes(entry.id) && !entry.eliminated)
  if (userEntriesWithoutPicks.length === 1 && !selectedEntryId) {
    setSelectedEntryId(userEntriesWithoutPicks[0].id);
  }

  const _createPick = async(teamId) => {
    const response = await postThing(
      {
        entry_id: selectedEntryId,
        game_id: selectedGame.id,
        team_id: teamId
      },
      "picks",
      [['leagues', league.id], ['entries', selectedEntryId], ['weeks', selectedGame.weekId]]
    );
    return response;
  }


  const _handleEntrySelect = (event, newEntry) => {
    setSelectedEntryId(newEntry);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        onClose={() => {
          setSelectedEntryId(null);
          closeModal();
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Choose Wisely...</h2>
            <div className={classes.toggleContainer}>
              <Typography>Selecting for:</Typography>
              <ToggleButtonGroup
                value={selectedEntryId}
                exclusive
                onChange={_handleEntrySelect}
                aria-label="select entry"
              >
                {userEntriesWithoutPicks.map(entry => (
                  <ToggleButton key={entry.id} value={entry.id} aria-label="left aligned">
                    {entry.nickname}
                 </ToggleButton>
                ))}                
              </ToggleButtonGroup>
            </div>
            <div>
              <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
                disabled={!selectedEntryId}
              >
                <Button
                  onClick={async() => {
                    const picks = await _createPick(selectedGame.homeTeamId);
                    onSave(picks);
                }}>
                  {selectedGame.homeTeamName}
                </Button>
                <Button
                onClick={async() => {
                  const picks = await _createPick(selectedGame.awayTeamId);
                  onSave(picks);
                }}>
                  {selectedGame.awayTeamName}
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default PickCreator;