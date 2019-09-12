import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { green } from '@material-ui/core/colors'
import moment from 'moment';

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
  table: {
    minWidth: 650,
  },
  final: {
    opacity: 0.3
  },
  today: {
    backgroundColor: green[400]
  }
}));


const WeekTable = ({data}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Start Time</TableCell>
              <TableCell>Home</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Away</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => {
              return (
                <TableRow key={row.id} className={[row.final && classes.final, moment().isSame(moment(row.startTime), 'day') && classes.today]}>
                  <TableCell component="th" scope="row">
                    {moment(row.startTime).format("ddd MMM D, YY @ h:mm a")}
                  </TableCell>
                  <TableCell>{row.homeTeamName}</TableCell>
                  <TableCell>{row.homeTeamScore}</TableCell>
                  <TableCell>{row.awayTeamName}</TableCell>
                  <TableCell>{row.awayTeamScore}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default WeekTable;