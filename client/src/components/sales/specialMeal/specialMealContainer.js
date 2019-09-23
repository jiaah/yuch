import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import { tomorrow, lastMonth } from '../../../helpers/moment';
import DateButtons from '../../../shared/form/dateButtons';
/* --- Actions --- */
import * as dateTrackerActiions from '../../../actions/dateTrackerAction';
import { addFlashMessage } from '../../../actions/messageAction';

const SpecialMealContainer = ({
  date,
  dateTrackerActions: { updateDate, resetDate },
  addFlashMessage,
}) => {
  const [specialMeal, setSpecialMeal] = useState([]);

  const fetchData = async when => {};

  useEffect(() => {
    fetchData(date);
    return () => resetDate();
  }, []);

  return (
    <div className="user-catering--container">
      <h2 className="pointer" title="오늘 일자로 돌아가기" onClick={resetDate}>
        식당 매출 관리
      </h2>
      <React.Fragment>
        <DateButtons
          monthlyUnit={true}
          date={date}
          startTime="20180101"
          endTime="20220101"
          updateDate={updateDate}
          addFlashMessage={addFlashMessage}
          fetchData={fetchData}
          dateForwardMessage="존재하지 않는 페이지입니다."
        />
      </React.Fragment>
    </div>
  );
};

const mapStateToProps = state => ({
  date: state.dateTracker.date,
});
const mapDispatchToProps = dispatch => ({
  dateTrackerActions: bindActionCreators(dateTrackerActiions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SpecialMealContainer);
