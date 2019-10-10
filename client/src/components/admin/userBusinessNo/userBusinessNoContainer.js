import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import BusinessNoPaper from './userBusinessNoPaper';
import SearchBar from '../../../shared/searchBar/searchBarContainer';
import IconButton from '../../../shared/form/iconButton';
import { printDiv } from '../../../utils/print';
/* --- Actions --- */
import { getUsersBusinessNo } from '../../../actions/adminAccountAction';
import * as selectedActions from '../../../actions/selectedAction';
import { addFlashMessage } from '../../../actions/messageAction';

const BusinessNoContainer = ({
  getUsersBusinessNo,
  selectedActions: { resetSelectedItemValue },
  addFlashMessage,
  selectedItemValue,
}) => {
  const [data, setData] = useState(null);

  // selected row on click
  const [selectedRow, setSelectedRow] = useState(null);
  const setfocusOnSelectdRow = id => setSelectedRow(id);
  const removeFocusOnSelectdRow = () => setSelectedRow(null);

  const fetchData = async () => {
    const res = await getUsersBusinessNo();
    if (res.error) {
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    }
    return setData(res);
  };

  useEffect(() => {
    fetchData();
    return () => {
      if (selectedItemValue) resetSelectedItemValue();
    };
  }, []);

  const handleTableRowClick = id => {
    setfocusOnSelectdRow(id);
    if (selectedItemValue) resetSelectedItemValue();
  };

  const handleSuggestionSelected = () => {
    if (selectedRow) removeFocusOnSelectdRow();
  };

  return (
    <div id="print" className="container-a r--w-30">
      <div className="print-width">
        <h2>고객 사업자 번호</h2>
        <div className="paper-label-box flex justify-between pt2">
          <SearchBar
            data={data}
            searchingProp="companyName"
            handleSuggestionSelected={handleSuggestionSelected}
            handleResetSearch={() => {}}
          />
          <IconButton
            name="print"
            width="32"
            height="32"
            viewBox="0 0 25 25"
            handleClick={() => printDiv('print')}
          />
        </div>
        <BusinessNoPaper
          users={data}
          selectedItemValue={selectedItemValue}
          selectedRow={selectedRow}
          handleTableRowClick={handleTableRowClick}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  selectedItemValue: state.selected.value,
});

const mapDispatchToProps = dispatch => ({
  selectedActions: bindActionCreators(selectedActions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
  getUsersBusinessNo: () => dispatch(getUsersBusinessNo()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BusinessNoContainer);
