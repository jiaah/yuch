import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import { dateInKorean, today } from '../../../helpers/moment';
import { convertToDateForm, dayBefore, dayAfter } from '../../../utils/time';
import IconButton from '../../../shared/form/iconButton';
import CateringFormBox from './cateringFormBox';
/* --- Actions --- */
import * as cateringActions from '../../../actions/catering';
import {
  cateringYes,
  cateringToday,
  cateringTmr,
} from '../../../__tests__/__mocks__/mockData';
import { addFlashMessage } from '../../../actions/messageAction';

const CateringContainer = ({
  id,
  cateringActions: { fetchUserCatering },
  addFlashMessage,
}) => {
  const [catering, setCatering] = useState(null);

  const fetchData = async (id, time) => {
    // const res = await fetchUserCatering(id, date);

    // if (res.error) {
    //   setCatering(null);
    //   return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    // }
    let mockData;
    if (time === '2019-09-09') {
      mockData = await cateringYes;
    }
    if (time === '2019-09-10') {
      mockData = await cateringToday;
    }
    if (time === '2019-09-11') {
      mockData = await cateringTmr;
    }
    const { date, lunchQty, dinnerQty, lateNightSnackQty } = mockData;
    console.log('mockData: ', mockData);
    const convertedData = await {
      date,
      lunchQty: lunchQty === 0 ? '' : lunchQty.toString(),
      dinnerQty: dinnerQty === 0 ? '' : dinnerQty.toString(),
      lateNightSnackQty:
        lateNightSnackQty === 0 ? '' : lateNightSnackQty.toString(),
    };
    return setCatering(convertedData);
  };
  console.log('@@@@@@', catering);
  const handleDateBackward = () => {
    const newDate = dayBefore(catering.date);
    fetchData(id, newDate);
  };
  const handleDateForward = () => {
    const newDate = dayAfter(catering.date);
    fetchData(id, newDate);
  };

  useEffect(() => {
    fetchData(id, today);
  }, []);

  // const displayedDate = convertToDateForm(catering.date);

  return (
    <div className="container">
      <h2>식수현황</h2>
      <div>
        <IconButton
          name="arrowBack"
          width="40"
          height="40"
          viewBox="0 0 30 30"
          handleClick={handleDateBackward}
        />
        {/* {displayedDate} */}
        <IconButton
          name="arrowForward"
          width="40"
          height="40"
          viewBox="0 0 30 30"
          handleClick={handleDateForward}
        />
      </div>
      <div>
        <CateringFormBox catering={catering} />
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  id: state.auth.id,
});
const mapDispatchToProps = dispatch => ({
  cateringActions: bindActionCreators(cateringActions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CateringContainer);
