import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  TextField,
  FormControl,
  Input,
  InputLabel,
} from '@material-ui/core';
/* --- Components --- */
import TextMaskCustom from './textMaskCustom';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: '6em',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
});

const ReserveForm = ({
  reserveInfo,
  tomorrow,
  submitBtnClicked,
  handleClose,
  handleChange,
  handleSubmit,
  classes,
}) => {
  const { name, contact, number, place, date, time } = reserveInfo;

  return (
    <React.Fragment>
      <div>
        <TextField
          id="name"
          label="이름"
          value={name}
          InputLabelProps={{ shrink: true }}
          margin="normal"
          fullWidth
          error={submitBtnClicked && name === ''}
          // helperText={nameErrorText}
          onChange={ev => handleChange(ev)}
          required={true}
          className="input-name"
        />
        <FormControl
          margin="normal"
          fullWidth
          error={
            submitBtnClicked &&
            (contact === '' ||
              contact === '(0  )    -    ' ||
              !!(contact[11].indexOf('_') !== -1) ||
              !!(contact[12].indexOf('_') !== -1) ||
              !!(contact[13].indexOf('_') !== -1))
          }
        >
          <InputLabel htmlFor="formatted-text-mask-input">연락처 *</InputLabel>
          <Input
            id="contact"
            placeholder="(054)-745-0999"
            value={contact}
            inputComponent={TextMaskCustom}
            onChange={ev => handleChange(ev)}
            required={true}
            className="input-contact"
          />
        </FormControl>
        <TextField
          id="number"
          label="인원수"
          value={number}
          onChange={ev => handleChange(ev)}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          fullWidth
          required={true}
          className="input-number"
        />
        <TextField
          id="place"
          label="장소"
          value={place}
          InputLabelProps={{ shrink: true }}
          margin="normal"
          fullWidth
          multiline
          onChange={ev => handleChange(ev)}
          required={true}
          className="input-place"
        />
        <TextField
          id="date"
          label="날짜"
          type="date"
          defaultValue={tomorrow}
          margin="normal"
          fullWidth
          onChange={ev => handleChange(ev)}
          required={true}
          className="input-date"
        />
        <TextField
          id="time"
          label="시간"
          type="time"
          defaultValue="12:30"
          inputProps={{
            step: 900,
          }}
          margin="normal"
          fullWidth
          onChange={ev => handleChange(ev)}
          required={true}
          className="input-time"
        />
      </div>
      <div className="mt2">
        <Button
          onClick={ev => handleSubmit(ev)}
          variant="contained"
          color="secondary"
          className={`btn-reserve ${classes.button}`}
          // disabled={
          //   name === '' ||
          //   contact === '' ||
          //   contact === '(0  )    -    ' ||
          //   !!(contact[11].indexOf('_') !== -1) ||
          //   !!(contact[12].indexOf('_') !== -1) ||
          //   !!(contact[13].indexOf('_') !== -1) ||
          //   number === '' ||
          //   place === '' ||
          //   date === '' ||
          //   time === ''
          // }
        >
          예약완료
        </Button>
        <Button
          onClick={handleClose}
          variant="outlined"
          color="secondary"
          className={`btn-close ${classes.button}`}
        >
          닫기
        </Button>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(ReserveForm);
