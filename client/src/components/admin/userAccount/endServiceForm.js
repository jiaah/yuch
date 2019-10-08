import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '../../../../assets/icons';
/* --- Components --- */
// import { firstDayOfLastMonth } from '../../../utils/date';
import IconMessage from '../../../shared/iconMessage';
import {
  endServiceMessageA,
  endServiceMessageB,
  endServiceMessageC,
  endServiceMessageD,
} from '../../../data/message';
import FormButton from '../../../shared/form/formButton';

const EndServiceForm = ({
  // checkedDate,
  // localState
  isSubmitting,
  endService,
  startDate,
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
          label={endService ? '서비스 종료 일자' : '서비스 시작 일자'}
          type="date"
          value={endService ? endDate : startDate}
          margin="normal"
          className="end-of-service-date"
          // error={firstDayOfLastMonth() > checkedDate}
          // helperText="서비스 적용 일자를 선택해주세요."
          onChange={handleChange('endDate')}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon
                  name="calendar"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <p className="f-mini">
        서비스가&#8199;
        <span className="c-point2">{endService ? '종료' : '활성화'}</span>
        &#8201;된 상태입니다.
      </p>
      {!endService && (
        <p className="f-mini">
          재활성화 하였다면 반드시{' '}
          <span className="c-point2">시작일자를 수정</span>
          해주세요.{' '}
        </p>
      )}
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
