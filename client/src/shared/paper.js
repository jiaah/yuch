import React from 'react';
import Paper from '@material-ui/core/Paper';

const PaperBox = ({ component, classes }) => (
  <Paper className={`paper-padding ${classes}`}>{component}</Paper>
);

export default PaperBox;
