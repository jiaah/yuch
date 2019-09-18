import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import { today, inAWeek } from '../../../helpers/moment';
import * as dateUtils from '../../../utils/date';
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
  const {
    isLunchQtyChangeDisabled,
    isDinnerQtyChangeDisabled,
    formatToDateForm,
    formatToYYYYMMDD,
  } = dateUtils;
  const [catering, setCatering] = useState(null);
  console.log('catering: ', catering);

  const [createdAt, setCreatedAt] = useState('');

  const formattedDate = formatToDateForm(date);
  formatToYYYYMMDD(createdAt);

  const fetchData = async (id, when) => {
    const res = await fetchUserCatering(id, when);

    if (res.error) {
      setCatering({
        date: formatedDate,
        created_at: today,
        lunchQty: null,
        dinnerQty: null,
        lateNightSnackQty: null,
      });
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    }
    await setCreatedAt(formatToYYYYMMDD(res.created_at));
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
      {catering && (
        <React.Fragment>
          <DateButtons
            id={id}
            date={date}
            updateDate={updateDate}
            addFlashMessage={addFlashMessage}
            fetchData={fetchData}
            inAWeek={inAWeek}
            dateUtils={dateUtils}
            formattedDate={formattedDate}
            createdAt={createdAt}
            dateForwardMessage="7일 내의 식수량만 미리 등록 할 수 있습니다."
          />
          <div className="user-catering--form">
            <CateringFormBox
              today={today}
              id={id}
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
