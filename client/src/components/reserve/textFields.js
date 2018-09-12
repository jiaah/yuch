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
const TextFields = ({ classes, reserveInfo, handleChange }) => {
  const { name, contact, number, place } = reserveInfo;
  return (
    <div className={classes.container}>
      <TextField
        id="name"
        label="이름"
        value={name}
        className={`${classes.textField}`}
        InputLabelProps={{ shrink: true }}
        margin="normal"
        onChange={ev => handleChange(ev)}
        // maxLength not working
        maxLength="10"
        required
      />
      <FormControl className={classes.formControl} margin="normal">
        <InputLabel htmlFor="formatted-text-mask-input">연락처 *</InputLabel>
        <Input
          id="contact"
          value={contact}
          inputComponent={TextMaskCustom}
          onChange={ev => handleChange(ev)}
          required
        />
      </FormControl>
      <TextField
        id="number"
        label="인원수"
        placeholder="대규모 가능"
        value={number}
        onChange={ev => handleChange(ev)}
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        required
      />
      <TextField
        id="place"
        label="장소"
        placeholder="경주 전 지역"
        value={place}
        className={`${classes.textField}`}
        InputLabelProps={{ shrink: true }}
        margin="normal"
        onChange={ev => handleChange(ev)}
        // maxLength not working
        maxLength="20"
        required
      />
    </div>
  );
};

export default withStyles(styles)(TextFields);
