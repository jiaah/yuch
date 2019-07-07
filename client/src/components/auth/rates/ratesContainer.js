import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import RatesPaper from './ratesPaper';
import SearchBar from '../../../shared/searchBar/searchBarContainer';
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
    <div className="container r--w-50">
      <h2>식수가격</h2>
      <div className="paper-label-box paper-label-box--rates">
        <SearchBar users={data} />
      </div>
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
