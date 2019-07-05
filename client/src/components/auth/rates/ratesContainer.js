import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
/* --- Actions --- */
import { getCateringRates } from '../../../actions/userAction';

const RatesContainer = ({ getCateringRates }) => {
  const [data, setData] = useState(null);
  const fetchCateringRates = async () => {
    const res = await getCateringRates();
    return setData(res);
  };
  useEffect(() => {
    fetchCateringRates();
  }, []);

  return (
    <div className="container">
      <h2>Hello</h2>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  getCateringRates: () => dispatch(getCateringRates()),
});

export default connect(
  null,
  mapDispatchToProps,
)(RatesContainer);
