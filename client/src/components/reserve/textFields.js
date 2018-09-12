import React from 'react';
import MaskedInput from 'react-text-mask';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 300,
    margin: 5,
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[
        '(',
        /[0-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

// width: TextFields-textField-31
// margin-top 16 bottom 8 TextFields-textField-31
const TextFields = ({ classes, handleChange, contactNumber }) => (
  <div>
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="name"
        label="이름"
        className={classes.textField}
        InputLabelProps={{ shrink: true }}
        margin="normal"
        onChange={ev => handleChange(ev)}
        required
      />
    </form>
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="formatted-text-mask-input">연락처 *</InputLabel>
      <Input
        id="contact"
        value={contactNumber}
        inputComponent={TextMaskCustom}
        margin="normal"
        onChange={ev => handleChange(ev)}
        required
      />
    </FormControl>
  </div>
);

export default withStyles(styles)(TextFields);
