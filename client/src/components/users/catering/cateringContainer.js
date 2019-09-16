import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import { today } from '../../../helpers/moment';
import { convertToDateForm, dayBefore, dayAfter } from '../../../utils/time';
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
  // catering,
  dateTrackerActions: { updateDate, resetDate },
  cateringActions: { fetchUserCatering, updateUserCatering },
  addFlashMessage,
}) => {
  const [catering, setCatering] = useState(null);
  console.log('hey, newHey: ', hey, newHey);
  const fetchData = async (id, when) => {
    // const res = await fetchUserCatering(id, date);

    // if (res.error) {
    //   setCatering(null);
    //   return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    // }
    let mockData;
    if (when === '2019-09-10') {
      mockData = await cateringYes;
    }
    if (when === '2019-09-11') {
      mockData = await cateringToday;
    }
    if (when === '2019-09-12') {
      mockData = await cateringTmr;
    }
    return setCatering(mockData);
  };

  const handleDateBackward = async () => {
    const newDate = await dayBefore(date);
    await updateDate(newDate);
    return fetchData(id, newDate);
  };
  const handleDateForward = async () => {
    const newDate = await dayAfter(date);
    await updateDate(newDate);
    return fetchData(id, newDate);
  };

  useEffect(() => {
    // when first page renders, date is set to 'today'.
    // when refresh the browser, date does not set back to 'today'
    fetchData(id, date);
    return () => updateDate(today);
  }, []);

  const displayedDate = catering && convertToDateForm(catering.date);

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
