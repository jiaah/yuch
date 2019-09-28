import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  // outlined note
  textField: {
    width: 267,
    paddingTop: '10px ',
    paddingLeft: '10px',
    marginTop: '20px',
    [theme.breakpoints.up('md')]: {
      width: 581.5,
    },
  },
});

const Input = ({
  classes,
  styleName,
  field: { name, value, onBlur },
  form: { handleChange },
  ...props
}) => (
  <TextareaAutosize
    aria-label="textarea"
    name={name}
    value={value || ''}
    onChange={handleChange}
    onBlur={onBlur}
    {...props}
    className={classes[styleName]}
  />
);

export default withStyles(styles)(Input);
