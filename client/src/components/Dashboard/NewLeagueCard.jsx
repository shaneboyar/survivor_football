import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    minWidth: 275,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

const NewLeagueCard = ({  }) =>  {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Button size="large" onClick={() => {}}>Create A New League</Button>
    </Card>
  );
}

export default NewLeagueCard;