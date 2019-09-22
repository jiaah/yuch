import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
/* --- Components --- */
import { formattedToday } from '../../../helpers/moment';
import { formatToYYYYMMDD } from '../../../utils/date';
import IconMessage from '../../../shared/iconMessage';
import { endServiceMessageA, endServiceMessageB } from '../../../data/message';
import FormButton from '../../../shared/form/formButton';

const EndServiceFormBox = ({
  userId,
  // actions
  handleEndingService,
  addFlashMessage,
  // funcs
  closeSubModal,
  handleCloseModal,
}) => {
  // state endService & date -> values from db : fomattedToday
  const [state, setState] = useState({
    endService: false,
    endDate: formattedToday,
  });
  const { endService, endDate } = state;
  const [isSubmitting, setSubmitting] = useState(false);

  const handleChange = name => event => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async () => {
    await setSubmitting(true);

    const formattedDate = formatToYYYYMMDD(endDate);
    const res = await handleEndingService(userId, endService, formattedDate);

    if (!res.error) {
      addFlashMessage('success', '서비스 설정을 성공적으로 저장하였습니다.');
      Promise.all([setSubmitting(false), closeSubModal(), handleCloseModal()]);
    } else {
      addFlashMessage(
        'error',
        '서비스 설정에 실패하였습니다. 다시 시도해주세요.',
      );
    }
    return setSubmitting(false);
  };

  const today = formatToYYYYMMDD(formattedToday);
  const checkedDate = formatToYYYYMMDD(endDate);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt4 mb2 user-form center user-form--service">
        <div className="user-form--service-checkbox">
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
        </div>
        <TextField
          id="date"
          label="적용 날짜"
          type="date"
          defaultValue={endDate}
          margin="normal"
          className="user-form--service-date"
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
        isSubmitting={isSubmitting}
      />
      <div className="flex justify-end pw2 mt4">
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

export default EndServiceFormBox;
