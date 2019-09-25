import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
/* --- Components --- */
import { formattedToday } from '../../../helpers/moment';
import IconMessage from '../../../shared/iconMessage';
import { endServiceMessageA, endServiceMessageB } from '../../../data/message';
import FormButton from '../../../shared/form/formButton';

const EndServiceFormBox = ({
  userId,
  formattedUserEndDate,
  // actions
  handleEndingService,
  addFlashMessage,
  // funcs
  closeSubModal,
  handleCloseModal,
  formatToYYYYMMDD,
}) => {
  // state endService & date -> values from db : fomattedToday
  const [state, setState] = useState({
    endService: !!formattedUserEndDate,
    endDate: formattedUserEndDate || formattedToday,
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
      <div className="mh2">
        <div className="mh1 media--justify-around end-of-service">
          <div className="end-of-service-checkbox">
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
            id="endDate"
            label="적용 일자"
            type="date"
            value={endDate}
            margin="normal"
            className="end-of-service-date"
            error={today > checkedDate}
            helperText="금일부터 등록 가능"
            onChange={handleChange('endDate')}
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
      </div>
      <IconMessage
        name="info"
        width="42.5"
        height="18"
        viewBox="0 0 20 20"
        fillOuter="#2196F3"
        fillInner="#ffffff"
        text={endServiceMessageA}
        position="end"
        iconBoxStyle="pw2"
        textStyle="icon-message--info f-mini"
      />
      <IconMessage
        name="info"
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fillOuter="#2196F3"
        fillInner="#ffffff"
        text={endServiceMessageB}
        position="end"
        iconBoxStyle="pw2 pt2"
        textStyle="icon-message--info f-mini"
      />
    </form>
  );
};

export default EndServiceFormBox;
