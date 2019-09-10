import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import { dateInKorean, today } from '../../../helpers/moment';
import { dayBefore, dayAfter } from '../../../utils/time';
import IconButton from '../../../shared/form/iconButton';
/* --- Actions --- */
import * as cateringActions from '../../../actions/catering';
import { addFlashMessage } from '../../../actions/messageAction';

const CateringContainer = ({
  id,
  cateringActions: { fetchUserCatering },
  addFlashMessage,
}) => {
  const init = { lunchQty: '', dinnerQty: '', lateNightSnackQty: '' };
  const [catering, setCatering] = useState(init);

  const fetchData = async (id, date) => {
    const res = await fetchUserCatering(id, date);

    if (res.error) {
      setCatering(init);
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    }

    return setCatering(res);
  };

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
        {dateInKorean}
        <IconButton
          name="arrowForward"
          width="40"
          height="40"
          viewBox="0 0 30 30"
          handleClick={handleDateForward}
        />
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
