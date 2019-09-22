import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import { formattedToday } from '../../../helpers/moment';
import IconMessage from '../../../shared/iconMessage';
import { endServiceMessageA, endServiceMessageB } from '../../../data/message';
import FormButton from '../../../shared/form/formButton';

const styles = () => ({
  input: { width: 150 },
});

const EndServiceFormBox = ({ classes: { input } }) => {
  // state endService & date -> values from db : fomattedToday
  const [state, setState] = useState({
    endService: false,
    date: formattedToday,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = name => event => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = () => console.log('submitted');

  const today = formattedToday.replace(/[^a-zA-Z0-9 ]/g, '');
  const checkedDate = state.date.replace(/[^a-zA-Z0-9 ]/g, '');

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt4 mb4 user-form w-70 center">
        <FormControlLabel
          control={
            <Checkbox
              checked={state.endService}
              onChange={handleChange('endService')}
              value="endService"
            />
          }
          label="서비스 종료"
        />
        <TextField
          id="date"
          label="날짜"
          type="date"
          defaultValue={formattedToday}
          margin="normal"
          className={input}
          error={today > checkedDate}
          helperText="금일부터 미래날짜만 등록"
          onChange={handleChange('date')}
          required={state.endService}
          disabled={!state.endService}
        />
      </div>
      <FormButton
        typeValue="submit"
        variantValue="contained"
        buttonName="저장"
        width="medium"
        isSubmitting={!state.endService || isSubmitting}
      />
      <div className="flex justify-end pw2">
        <IconMessage
          name="info"
          width="42.5"
          height="18"
          viewBox="0 0 20 20"
          fillOuter="#2196F3"
          fillInner="#ffffff"
          classes="icon-message--info f-mini"
          text={endServiceMessageA}
        />
      </div>
      <div className="flex justify-end pw2">
        <IconMessage
          name="info"
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fillOuter="#2196F3"
          fillInner="#ffffff"
          classes="icon-message--info f-mini"
          text={endServiceMessageB}
        />
      </div>
    </form>
  );
};

export default withStyles(styles)(EndServiceFormBox);
