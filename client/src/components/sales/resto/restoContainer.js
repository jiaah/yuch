import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import { today, inAWeek } from '../../../helpers/moment';
import * as dateUtils from '../../../utils/date';
import RestoFormBox from './restoFormBox';
import DateButtons from '../../../shared/form/dateButtons';
import { restoSalesMsg } from '../../../data/message';
/* --- Actions --- */
import * as dateTrackerActiions from '../../../actions/dateTrackerAction';
import * as cateringActions from '../../../actions/cateringAction';
import { addFlashMessage } from '../../../actions/messageAction';

const RestoContainer = ({
  id,
  date,
  dateTrackerActions: { updateDate, resetDate },
  cateringActions: { fetchUserCatering, updateUserCatering },
  addFlashMessage,
}) => {
  const { formatToDateForm } = dateUtils;
  const formatedDate = formatToDateForm(date);
  const [resto, setResto] = useState(null);

  const fetchData = async (id, when) => {
    // create action / reducer
    const res = await fetchUserCatering(id, when);

    if (res.error) {
      setResto({
        date: formatedDate,
        created_at: today,
        lunchQty: null,
        dinnerQty: null,
        lateNightSnackQty: null,
      });
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    }
    return setResto(res);
  };

  useEffect(() => {
    fetchData(id, date);
    return () => resetDate();
  }, []);

  return (
    <div className="user-catering--container">
      <h2>식당 매출 관리</h2>
      {resto && (
        <React.Fragment>
          <DateButtons
            id={id}
            date={date}
            updateDate={updateDate}
            addFlashMessage={addFlashMessage}
            fetchData={fetchData}
            inAWeek={inAWeek}
            dateUtils={dateUtils}
            formatedDate={formatedDate}
            createdAt={resto.created_at}
            dateForwardMessage="존재하지 않는 페이지입니다."
          />
          <div className="user-catering--form">
            <RestoFormBox
              today={today}
              id={id}
              resto={resto}
              updateUserCatering={updateUserCatering}
            />
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
)(RestoContainer);
