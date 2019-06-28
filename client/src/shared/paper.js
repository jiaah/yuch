import React from 'react';
import Paper from '@material-ui/core/Paper';

const PaperBox = ({ component }) => (
  <Paper className="mt2 paper-padding">{component}</Paper>
);

export default PaperBox;
