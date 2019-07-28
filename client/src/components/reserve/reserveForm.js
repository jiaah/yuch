import React from 'react';
import { TextField, FormControl, Input, InputLabel } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
/* --- Components --- */
import TextMaskCustom from './textMaskCustom';
import Button from '../../shared/form/button';

export const ReserveForm = ({
  reserveInfo,
  inThreeDays,
  submitBtnClicked,
  handleChange,
  handleSubmit,
}) => {
  const { name, contact, number, place, date, time } = reserveInfo;

  const dateToNumber = date.replace(/[^a-zA-Z0-9 ]/g, '');
  const timeToNumber = time.replace(/[^a-zA-Z0-9 ]/g, '');
  const validDateToNumber = inThreeDays.replace(/[^a-zA-Z0-9 ]/g, '');
  const inValidContactValue = !!(
    contact === '(0  )    -    ' ||
    !!(contact[11].indexOf('_') !== -1) ||
    !!(contact[12].indexOf('_') !== -1) ||
    !!(contact[13].indexOf('_') !== -1)
  );

  return (
    <form data-testid="reserve-form">
      <div className="mb2">
        <TextField
          id="name"
          label="이름"
          placeholder="유청"
          value={name}
          InputLabelProps={{ shrink: true }}
          margin="normal"
          fullWidth
          error={submitBtnClicked && name === ''}
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
            error={submitBtnClicked && inValidContactValue}
            onChange={ev => handleChange(ev)}
            required={true}
          />
        </FormControl>
        <TextField
          id="number"
          label="인원수"
          placeholder="80"
          value={number}
          error={submitBtnClicked && number === ''}
          onChange={ev => handleChange(ev)}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          fullWidth
          required={true}
          InputProps={{
            endAdornment: <InputAdornment position="end">명</InputAdornment>,
          }}
        />
        <TextField
          id="place"
          label="장소"
          placeholder="경주시 황성동 1071-1번지 유청"
          value={place}
          InputLabelProps={{ shrink: true }}
          margin="normal"
          fullWidth
          multiline
          error={submitBtnClicked && place === ''}
          helperText="경주시 내 전지역 배달 가능합니다."
          onChange={ev => handleChange(ev)}
          required={true}
        />
        <TextField
          id="date"
          label="날짜"
          type="date"
          defaultValue={inThreeDays}
          margin="normal"
          fullWidth
          error={dateToNumber < validDateToNumber}
          helperText="최소 3일 전일 경우에만 예약 진행 가능합니다."
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
          error={timeToNumber < 1100 || timeToNumber > 2000}
          helperText="( 예약 가능 시간 )  11:00 - 20:00"
          onChange={ev => handleChange(ev)}
          required={true}
        />
      </div>
      <Button
        typeValue="submit"
        variantValue="contained"
        buttonName="예약완료"
        width="medium"
        handleButtonClick={ev => handleSubmit(ev)}
      />
    </form>
  );
};

export default ReserveForm;
