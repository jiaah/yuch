import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import RatesPaper from './ratesPaper';
import SearchBar from '../../../shared/searchBar/searchBarContainer';
/* --- Actions --- */
import { getCateringRates } from '../../../actions/userAction';
import { resetSelectedItemValue } from '../../../actions/selectedAction';

const RatesContainer = ({
  getCateringRates,
  resetSelectedItemValue,
  selectedSearchItem,
}) => {
  const [data, setData] = useState(null);

  const fetchCateringRates = async () => {
    const res = await getCateringRates();
    setData(res);
  };

  useEffect(() => {
    fetchCateringRates();
    return () =>
      Promise.all[
        selectedSearchItem !== null ? resetSelectedItemValue() : null
      ];
  }, []);

  const renderAllUsers = () => resetSelectedItemValue();
  return (
    <div className="container r--w-50">
      <h2 onClick={renderAllUsers}>식수가격</h2>
      <div className="paper-label-box paper-label-box--rates">
        <SearchBar users={data} />
      </div>
      {data && (
        <RatesPaper users={data} selectedSearchItem={selectedSearchItem} />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  selectedSearchItem: state.selected.value,
});

const mapDispatchToProps = dispatch => ({
  getCateringRates: () => dispatch(getCateringRates()),
  resetSelectedItemValue: () => dispatch(resetSelectedItemValue()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatesContainer);
