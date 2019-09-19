import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import { today, inAWeek } from '../../../helpers/moment';
import * as dateUtils from '../../../utils/date';
import { adminCateringMsg } from '../../../data/message';
import DateButtons from '../../../shared/form/dateButtons';
/* --- Actions --- */
import * as dateTrackerActiions from '../../../actions/dateTrackerAction';
import * as cateringActions from '../../../actions/cateringAction';
import { addFlashMessage } from '../../../actions/messageAction';

const CateringContainer = ({
  id,
  date,
  dateTrackerActions: { updateDate, resetDate },
  cateringActions: { fetchUsersCatering, updateUsersCatering },
  addFlashMessage,
}) => {
  const { formatToDateForm, firstDayOfLastMonth } = dateUtils;
  const [catering, setCatering] = useState(null);

  const formattedDate = formatToDateForm(date);

  const fetchData = async when => {
    const res = await fetchUsersCatering(when);

    if (res.error) {
      setCatering();
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    }

    return setCatering(res);
  };

  useEffect(() => {
    fetchData(date);
    return () => resetDate();
  }, []);

  return (
    <div className="user-catering--container">
      <h2>식수현황</h2>
      {catering && (
        <React.Fragment>
          <DateButtons
            date={date}
            updateDate={updateDate}
            addFlashMessage={addFlashMessage}
            fetchData={fetchData}
            inAWeek={inAWeek}
            dateUtils={dateUtils}
            formattedDate={formattedDate}
            createdAt={firstDayOfLastMonth()}
            dateForwardMessage="7일 내의 식수량만 미리 등록 할 수 있습니다."
          />
          <div className="user-catering--form" />
        </React.Fragment>
      )}
      {adminCateringMsg}
    </div>
  );
};

const mapStateToProps = state => ({
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
