import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
/* --- Components --- */
import { firstDayOfLastMonth } from '../../../utils/date';
import IconMessage from '../../../shared/iconMessage';
import {
  endServiceMessageA,
  endServiceMessageB,
  endServiceMessageC,
  endServiceMessageD,
} from '../../../data/message';
import FormButton from '../../../shared/form/formButton';

const EndServiceForm = ({
  checkedDate,
  // localState
  isSubmitting,
  endService,
  endDate,
  // funcs
  handleChange,
  onVerification,
}) => (
  <form onSubmit={onVerification}>
    <div className="mh2">
      <div className="mh1 media--justify-around end-of-service">
        <div className="end-of-service-checkbox">
          <FormControlLabel
            control={
              <Checkbox
                checked={endService}
                onChange={handleChange('endService')}
                value="endService"
              />
            }
            label="서비스 종료"
          />
        </div>
        <TextField
          id="endDate"
          label="적용 일자"
          type="date"
          value={endDate}
          margin="normal"
          className="end-of-service-date"
          error={firstDayOfLastMonth() > checkedDate}
          helperText="지난달 1일부터 선택가능"
          onChange={handleChange('endDate')}
          required={endService}
          disabled={!endService}
        />
      </div>
      <FormButton
        typeValue="submit"
        variantValue="contained"
        buttonName="저장"
        width="medium"
        isSubmitting={isSubmitting}
      />
    </div>
    <IconMessage
      name="info"
      width="33"
      height="18"
      viewBox="0 0 20 20"
      fillOuter="#2196F3"
      fillInner="#ffffff"
      text={endServiceMessageA}
      position="start"
      iconBoxStyle="pw2"
      textStyle="icon-message--info f-mini"
    />
    <IconMessage
      name="info"
      width="15"
      height="18"
      viewBox="0 0 20 20"
      fillOuter="#2196F3"
      fillInner="#ffffff"
      text={endServiceMessageC}
      position="start"
      iconBoxStyle="pw2 pt3"
      textStyle="icon-message--info f-mini"
    />
    <IconMessage
      name="info"
      width="15"
      height="18"
      viewBox="0 0 20 20"
      fillOuter="#2196F3"
      fillInner="#ffffff"
      text={endServiceMessageD}
      position="start"
      iconBoxStyle="pw2 pt3"
      textStyle="icon-message--info f-mini"
    />
    <IconMessage
      name="info"
      width="15"
      height="18"
      viewBox="0 0 20 20"
      fillOuter="#2196F3"
      fillInner="#ffffff"
      text={endServiceMessageB}
      position="start"
      iconBoxStyle="pw2 pt3"
      textStyle="icon-message--info f-mini"
    />
  </form>
);

export default EndServiceForm;
