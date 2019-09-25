import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import { inAWeek, dateInKorean } from '../../../helpers/moment';
import {
  isLunchQtyChangeDisabled,
  isDinnerQtyChangeDisabled,
  formatToYYYYMMDD,
  formatToDateForm,
} from '../../../utils/date';
import { userCateringMsg } from '../../../data/message';
import CateringFormBox from './cateringFormBox';
import DateButtons from '../../../shared/form/dateButtons';
/* --- Actions --- */
import * as dateTrackerActiions from '../../../actions/dateTrackerAction';
import * as cateringActions from '../../../actions/cateringAction';
import { addFlashMessage } from '../../../actions/messageAction';

const CateringContainer = ({
  id,
  date,
  dateTrackerActions: { updateDate, resetDate },
  cateringActions: { fetchUserCatering, updateUserCatering },
  addFlashMessage,
}) => {
  const [catering, setCatering] = useState(null);
  const [startTime, setStartTime] = useState('');

  const fetchData = async when => {
    const res = await fetchUserCatering(id, when);
    if (res.error) {
      setCatering({
        date: dateInKorean,
        created_at: date,
        lunchQty: null,
        dinnerQty: null,
        lateNightSnackQty: null,
      });
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    }
    const startDate = await formatToYYYYMMDD(res.created_at);
    await setStartTime(startDate);
    return setCatering(res);
  };

  useEffect(() => {
    // page open -> default date, 'today'
    // browser refresh -> keep the changed date
    fetchData(date);
    return () => resetDate();
  }, []);

  // YYYYMMDD -> 'MM 월 DD 일 (ddd)'
  const formattedDate = formatToDateForm(date);
  // if end-of-service date is reserved, do not open catering page from the reserved endDate.
  const endTime = catering && catering.endDate ? catering.endDate : inAWeek;
  const formattedEndDate =
    catering && catering.endDate && formatToDateForm(catering.endDate);
  const message =
    catering && catering.endDate
      ? `${formattedEndDate} 일자로 고객님의 위탁급식 서비스가 종료됩니다.`
      : '7일 내의 식수량만 미리 등록 할 수 있습니다.';

  return (
    <div className="container-b">
      <h2 className="pointer" title="오늘 일자로 돌아가기" onClick={resetDate}>
        식수현황
      </h2>
      {catering && (
        <React.Fragment>
          <DateButtons
            reload={true}
            startTime={startTime}
            endTime={endTime}
            formattedDate={formattedDate}
            monthlyUnit={false}
            date={date}
            updateDate={updateDate}
            addFlashMessage={addFlashMessage}
            fetchData={fetchData}
            dateForwardMessage={message}
          />
          <div className="input-table">
            <CateringFormBox
              catering={catering}
              updateUserCatering={updateUserCatering}
              addFlashMessage={addFlashMessage}
              isLunchQtyDisabled={isLunchQtyChangeDisabled(date)}
              isDinnerQtyDisabled={isDinnerQtyChangeDisabled(date)}
            />
          </div>
        </React.Fragment>
      )}
      {userCateringMsg}
    </div>
  );
};

const mapStateToProps = state => ({
  id: state.auth.id,
  date: state.dateTracker.date,
  catering: state.httpHandler.data,
});
const mapDispatchToProps = dispatch => ({
  dateTrackerActions: bindActionCreators(dateTrackerActiions, dispatch),
  cateringActions: bindActionCreators(cateringActions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CateringContainer);
