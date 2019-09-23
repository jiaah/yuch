import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import {
  today,
  tomorrow,
  lastMonth,
  dateInKorean,
} from '../../../helpers/moment';
import RestoFormBox from './restoFormBox';
import DateButtons from '../../../shared/form/dateButtons';
import { restoSalesMsg } from '../../../data/message';
/* --- Actions --- */
import * as dateTrackerActiions from '../../../actions/dateTrackerAction';
import { addFlashMessage } from '../../../actions/messageAction';

const RestoContainer = ({
  id,
  date,
  dateTrackerActions: { updateDate, resetDate },
  addFlashMessage,
}) => {
  const [resto, setResto] = useState(null);

  const initfetchData = async when => {
    setResto({
      date: dateInKorean,
      lunchQty: null,
      dinnerQty: null,
      lateNightSnackQty: null,
    });
  };

  const fetchData = when => {};

  useEffect(() => {
    initfetchData(date);
    return () => resetDate();
  }, []);

  return (
    <div className="user-catering--container">
      <h2 className="pointer" title="오늘 일자로 돌아가기" onClick={resetDate}>
        식당 매출 관리
      </h2>
      {resto && (
        <React.Fragment>
          <DateButtons
            // non-interactive data with clients
            reload={false}
            date={date}
            startTime={lastMonth}
            endTime={tomorrow}
            updateDate={updateDate}
            addFlashMessage={addFlashMessage}
            fetchData={fetchData}
            dateForwardMessage="존재하지 않는 페이지입니다."
          />
          <div className="user-catering--form">
            <RestoFormBox id={id} resto={resto} today={today} />
          </div>
        </React.Fragment>
      )}
      {restoSalesMsg}
    </div>
  );
};

const mapStateToProps = state => ({
  id: state.auth.id,
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
)(RestoContainer);
