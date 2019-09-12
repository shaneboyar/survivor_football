import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: 16,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const LeagueCard = ({ data, onSelect }) =>  {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {data.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {`Created by ${data.creator}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onSelect(data.id)}>View Details</Button>
      </CardActions>
    </Card>
  );
}

export default LeagueCard;