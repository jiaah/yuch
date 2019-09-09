import React, { useEffect } from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import { dateInKorean } from '../../../helpers/moment';
import IconButton from '../../../shared/form/iconButton';

const CateringContainer = ({ id }) => {
  const fetchData = () => {
    console.log(id);
  };
  const handleDateBackward = () => console.log('backward');
  const handleDateForward = () => console.log('forward');

  useEffect(() => fetchData(), []);
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
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CateringContainer);
