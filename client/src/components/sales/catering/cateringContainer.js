import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import { inAWeek } from '../../../helpers/moment';
import * as dateUtils from '../../../utils/date';
import { adminCateringMsg } from '../../../data/message';
import DateButtons from '../../../shared/form/dateButtons';
import SearchBar from '../../../shared/searchBar/searchBarContainer';
import Loader from '../../loader';
import IconButton from '../../../shared/form/iconButton';
/* --- Actions --- */
import * as dateTrackerActiions from '../../../actions/dateTrackerAction';
import * as cateringActions from '../../../actions/cateringAction';
import { addFlashMessage } from '../../../actions/messageAction';

const CateringContainer = ({
  date,
  dateTrackerActions: { updateDate, resetDate },
  cateringActions: { fetchUsersCatering, updateUsersCatering },
  addFlashMessage,
}) => {
  const { formatToDateForm, firstDayOfLastMonth } = dateUtils;
  const [catering, setCatering] = useState(null);

  const formattedDate = formatToDateForm(date);
  const startTime = firstDayOfLastMonth();

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
      <h2 className="pointer" title="오늘 날짜로 돌아가기" onClick={resetDate}>
        식수현황
      </h2>
      <div className="paper-label-box flex justify-between">
        <SearchBar users={catering} />
        <IconButton
          name="print"
          width="32"
          height="32"
          viewBox="0 0 25 25"
          handleClick={() => printDiv('printRates')}
        />
      </div>
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
            startTime={startTime}
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
