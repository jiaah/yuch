import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import { inAWeek, dateInKorean } from '../../../helpers/moment';
import {
  isLunchQtyChangeDisabled,
  isDinnerQtyChangeDisabled,
  formatToDateForm,
  userEndDate,
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
  isActive,
  businessType,
  date,
  dateTrackerActions: { updateDateDaily, resetDateDaily },
  cateringActions: { fetchUserCatering, updateUserCatering },
  addFlashMessage,
}) => {
  const [catering, setCatering] = useState(null);

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
    return setCatering(res);
  };

  useEffect(() => {
    // page open -> default date, 'today'
    // browser refresh -> keep the changed date
    fetchData(date);
    return () => resetDateDaily();
  }, []);

  // YYYYMMDD -> 'MM 월 DD 일 (ddd)'
  const formattedDate = formatToDateForm(date);

  const startDate = catering && catering.startDate;
  const endDate = userEndDate(catering, inAWeek);

  const formattedEndDate = catering && formatToDateForm(catering.endDate);

  const message =
    catering && catering.endDate <= inAWeek
      ? `${formattedEndDate} 일자로 고객님의 위탁급식 서비스가 종료될 예정입니다.`
      : '7일 내의 식수량만 미리 등록 할 수 있습니다.';

  if (isActive) {
    return (
      <React.Fragment>
        {catering && (
          <div className="container-b">
            <h2
              className="pointer"
              title="오늘 일자로 돌아가기"
              onClick={resetDateDaily}
            >
              식수현황
            </h2>
            <React.Fragment>
              <DateButtons
                date={date}
                reload={true}
                unit="dd"
                formattedDate={formattedDate}
                startTime={startDate}
                endTime={endDate}
                updateDate={updateDateDaily}
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
                  businessType={businessType}
                />
              </div>
            </React.Fragment>
            {userCateringMsg}
          </div>
        )}
      </React.Fragment>
    );
  }

  return (
    <div id="notfound">
      <div className="notfound">
        <h2>
          유청 서비스가 시작되지 않았거나 종료되어 식수신청을 할 수 없습니다.
        </h2>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  id: state.auth.id,
  isActive: state.auth.isActive,
  businessType: state.auth.businessType,
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
