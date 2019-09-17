import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import { today, inAWeek } from '../../../helpers/moment';
import {
  convertToDateForm,
  dayBefore,
  dayAfter,
  isLunchQtyChangeDisabled,
  isDinnerQtyChangeDisabled,
} from '../../../utils/date';
import IconButton from '../../../shared/form/iconButton';
import CateringFormBox from './cateringFormBox';
import { userCateringMsg } from '../../../data/message';
/* --- Actions --- */
import * as dateTrackerActiions from '../../../actions/dateTrackerAction';
import * as cateringActions from '../../../actions/cateringAction';
import {
  cateringYes,
  cateringToday,
  cateringTmr,
} from '../../../__tests__/__mocks__/mockData';
import { addFlashMessage } from '../../../actions/messageAction';

const CateringContainer = ({
  id,
  date,
  dateTrackerActions: { updateDate, resetDate },
  cateringActions: { fetchUserCatering, updateUserCatering },
  addFlashMessage,
}) => {
  const [catering, setCatering] = useState(null);
  const fetchData = async (id, when) => {
    // const res = await fetchUserCatering(id, when);

    // if (res.error) {
    //   setCatering(null);
    //   return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    // }
    let mockData;
    if (when === '20190916') {
      mockData = await cateringYes;
    }
    if (when === '20190917') {
      mockData = await cateringToday;
    }
    if (when === '20190918') {
      mockData = await cateringTmr;
    }
    return setCatering(mockData);
  };

  const handleDateBackward = async () => {
    const createdAt = '20190916';
    // const createdAt = catering.created_at;
    const newDate = await dayBefore(date);

    if (newDate >= createdAt) {
      await updateDate(newDate);
      return fetchData(id, newDate);
    }
    return addFlashMessage('info', '존재하는 데이터가 없습니다.');
  };

  const handleDateForward = async () => {
    const newDate = await dayAfter(date);

    if (newDate < inAWeek) {
      await updateDate(newDate);
      return fetchData(id, newDate);
    }
    return addFlashMessage(
      'info',
      '7일 내의 식수량만 미리 등록 할 수 있습니다.',
    );
  };

  useEffect(() => {
    // page open -> default date, 'today'
    // browser refresh -> keep the changed date
    fetchData(id, date);
    return () => resetDate();
  }, []);

  const displayedDate = catering && convertToDateForm(date);

  return (
    <div className="user-catering--container">
      <h2>식수현황</h2>
      <div>
        <IconButton
          name="arrowBack"
          width="40"
          height="40"
          viewBox="0 0 30 30"
          handleClick={handleDateBackward}
        />
        {displayedDate}
        <IconButton
          name="arrowForward"
          width="40"
          height="40"
          viewBox="0 0 30 30"
          handleClick={handleDateForward}
        />
      </div>
      <div className="user-catering--form">
        {catering && (
          <CateringFormBox
            today={today}
            id={id}
            catering={catering}
            updateUserCatering={updateUserCatering}
            isLunchQtyDisabled={isLunchQtyChangeDisabled(date)}
            isDinnerQtyDisabled={isDinnerQtyChangeDisabled(date)}
          />
        )}
      </div>
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
