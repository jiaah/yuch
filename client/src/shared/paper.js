import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paper: {
    padding: '1em .7em',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '2em',
      paddingRight: '2em',
    },
  },
  widths: {
    [theme.breakpoints.up('lg')]: {
      width: '45%',
    },
  },
  widthl: {
    [theme.breakpoints.up('lg')]: {
      width: '100%',
    },
  },
});

const PaperBox = ({
  component,
  classes: { paper, widths, widthl },
  classname,
  isDivided,
}) => {
  const paperWidth = isDivided ? widths : widthl;
  return (
    <Paper className={`${paper} ${classname} ${paperWidth}`}>{component}</Paper>
  );
};

export default withStyles(styles)(PaperBox);
