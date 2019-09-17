import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import { today, inAWeek } from '../../../helpers/moment';
import * as dateUtils from '../../../utils/date';
import { userCateringMsg } from '../../../data/message';
import CateringFormBox from './cateringFormBox';
import DateButtons from './dateButtons';
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
  const { isLunchQtyChangeDisabled, isDinnerQtyChangeDisabled } = dateUtils;
  const fetchData = async (id, when) => {
    const res = await fetchUserCatering(id, when);

    if (res.error) {
      setCatering(null);
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    }
    return setCatering(res);
  };

  useEffect(() => {
    // page open -> default date, 'today'
    // browser refresh -> keep the changed date
    fetchData(id, date);
    return () => resetDate();
  }, []);

  return (
    <div className="user-catering--container">
      <h2>식수현황</h2>
      <DateButtons
        id={id}
        date={date}
        catering={catering}
        updateDate={updateDate}
        addFlashMessage={addFlashMessage}
        fetchData={fetchData}
        inAWeek={inAWeek}
        dateUtils={dateUtils}
      />
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
