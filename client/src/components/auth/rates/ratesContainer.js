import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import RatesPaper from './ratesPaper';
/* --- Actions --- */
import { getCateringRates } from '../../../actions/userAction';

const RatesContainer = ({ getCateringRates }) => {
  const [data, setData] = useState(null);

  const fetchCateringRates = async () => {
    const res = await getCateringRates();
    setData(res);
  };
  useEffect(() => {
    fetchCateringRates();
  }, []);

  return (
    <div className="container r--w-70">
      <h2>식수가격</h2>
      {data && <RatesPaper users={data} />}
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
