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
import * as moment from '../../../shared/moment';

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
  handleClose,
  handleChange,
  handleSave,
  classes,
}) => {
  const { name, contact, number, place, date, time } = reserveInfo;
  const { tommrow, now } = moment;

  return (
    <div>
      <div>
        <TextField
          id="name"
          label="이름"
          value={name}
          InputLabelProps={{ shrink: true }}
          margin="normal"
          fullWidth
          onChange={ev => handleChange(ev)}
          required={true}
        />
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="formatted-text-mask-input">연락처 *</InputLabel>
          <Input
            id="contact"
            placeholder="(054)-745-0999"
            value={contact}
            inputComponent={TextMaskCustom}
            onChange={ev => handleChange(ev)}
            required={true}
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
        />
        <TextField
          id="date"
          label="날짜"
          type="date"
          defaultValue={tommrow}
          margin="normal"
          fullWidth
          onChange={ev => handleChange(ev)}
          required={true}
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
        />
      </div>
      <div className="mt2">
        <Button
          onClick={ev => handleSave(ev, now)}
          variant="contained"
          color="secondary"
          className={classes.button}
          disabled={
            name === '' ||
            contact === '' ||
            contact === '(0  )    -    ' ||
            !!(contact[11].indexOf('_') !== -1) ||
            !!(contact[12].indexOf('_') !== -1) ||
            !!(contact[13].indexOf('_') !== -1) ||
            number === '' ||
            place === '' ||
            date === '' ||
            time === ''
          }
        >
          예약완료
        </Button>
        <Button
          onClick={handleClose}
          variant="outlined"
          color="secondary"
          className={classes.button}
        >
          닫기
        </Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(ReserveForm);