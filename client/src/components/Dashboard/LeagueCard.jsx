import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

import { deleteThing } from '../../utils';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 275,
    minHeight: 275,
    margin: 16,
  },
  cardContent: {
    flexGrow: 1
  },
  cardActions: {
    justifyContent: 'space-between'
  },
  deleteButton: {
    cursor: 'pointer'
  },
  pos: {
    marginBottom: 12,
  },
});

const _deleteLeague = async(id) => {
  const response = await deleteThing("leagues", id);
  return response;
}

const LeagueCard = ({ league, onSelect, onDelete}) =>  {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h5" component="h2">
          {league.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {`Created by ${league.creator}`}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        { league.deleteable ? 
          <DeleteIcon
            color="error"
            aria-label="delete"
            className={classes.deleteButton}
            onClick={async() => {
              if(window.confirm("delete?")) {
                const leagues = await _deleteLeague(league.id);
                onDelete(leagues);
              }
            }} /> :
          <span />
        }
        <Button size="small" onClick={() => onSelect(league.id)}>View Details</Button>
      </CardActions>
    </Card>
  );
}

export default LeagueCard;