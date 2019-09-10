import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import { dateInKorean, today } from '../../../helpers/moment';
import IconButton from '../../../shared/form/iconButton';
/* --- Actions --- */
import { fetchUserCatering } from '../../../actions/catering';
import { catering } from '../../../__tests__/__mocks__/mockData';
import { addFlashMessage } from '../../../actions/messageAction';

const CateringContainer = ({ id, fetchUserCatering, addFlashMessage }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    console.log('today: ', today);
    const res = await fetchUserCatering(id, today);

    if (res.error) {
      setData([]);
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    }
    console.log('fetched data');
    return setData(catering);
  };
  console.log('data: ', data);
  const handleDateBackward = () => console.log('backward');
  const handleDateForward = () => console.log('forward');

  useEffect(() => {
    fetchData();
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
  fetchUserCatering: id => dispatch(fetchUserCatering(id)),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CateringContainer);
