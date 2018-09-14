import React from 'react';
import MaskedInput from 'react-text-mask';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

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

const TextFields = ({ reserveInfo, btnClicked, handleChange }) => {
  const { name, contact, number, place } = reserveInfo;

  return (
    <div>
      <TextField
        id="name"
        label="이름"
        value={name}
        InputLabelProps={{ shrink: true }}
        margin="normal"
        fullWidth
        error={btnClicked && name === ''}
        // helperText={btnClicked && name === '' ? '성함을 입력하세요' : ''}
        onChange={ev => handleChange(ev)}
        // maxLength not working
        maxLength="10"
        required={true}
      />
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="formatted-text-mask-input">연락처 *</InputLabel>
        <Input
          id="contact"
          value={contact}
          inputComponent={TextMaskCustom}
          // BUG: error only works before there is input or click the delete button..
          error={
            btnClicked &&
            (contact === '' ||
              contact === '(0  )    -    ' ||
              contact === '(   )    -    ')
          }
          onChange={ev => handleChange(ev)}
          required={true}
        />
      </FormControl>
      <TextField
        id="number"
        label="인원수"
        value={number}
        error={btnClicked && (number === '' || number <= 0)}
        onChange={ev => handleChange(ev)}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        fullWidth
        required={true}
      />
      <TextField
        id="place"
        label="장소"
        value={place}
        InputLabelProps={{ shrink: true }}
        margin="normal"
        fullWidth
        error={btnClicked && place === ''}
        onChange={ev => handleChange(ev)}
        // maxLength not working
        maxLength="20"
        required={true}
      />
    </div>
  );
};

export default TextFields;
