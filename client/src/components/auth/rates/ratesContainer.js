import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import RatesPaper from './ratesPaper';
import SearchBar from '../../../shared/searchBar/searchBarContainer';
import Loader from '../../../shared/loader';
import IconButton from '../../../shared/iconButton';
import { printDiv } from '../../../utils/print';
/* --- Actions --- */
import * as rateActions from '../../../actions/rateAction';
import * as selectedActions from '../../../actions/selectedAction';
import * as modalActions from '../../../actions/modalAction';
import { addFlashMessage } from '../../../actions/messageAction';

const EditRateModal = Loader({
  loader: () =>
    import('./editRateModal' /* webpackChunkName: 'EditRateModal' */),
});
const RatesContainer = ({
  rateActions: { getCateringRates, updateReservedPrice },
  selectedActions: {
    resetSelectedItemValue,
    saveClickedItemData,
    resetClickedItemData,
  },
  addFlashMessage,
  selectedSearchItem,
  clickedUserData,
  show,
  modalActions: { showModal, hideModal },
}) => {
  const [data, setData] = useState(null);

  const fetchCateringRates = async () => {
    const res = await getCateringRates();
    setData(res);
  };

  useEffect(() => {
    fetchCateringRates();
    return () =>
      Promise.all([
        selectedSearchItem !== null ? resetSelectedItemValue() : null,
        clickedUserData.length !== 0 ? resetClickedItemData() : null,
      ]);
  }, []);

  const getClickedUserData = async id => {
    const userData = await data.filter(user => user.userId === id);
    return userData[0];
  };

  const handleEditUserBtnClick = async (e, id) => {
    e.preventDefault();
    const userData = await getClickedUserData(id);
    await saveClickedItemData(userData);
    return showModal();
  };

  const renderAllUsers = () => resetSelectedItemValue();

  return (
    <div className="container w-90">
      <h2 onClick={renderAllUsers}>식수가격</h2>
      <div className="paper-label-box flex justify-between">
        <SearchBar users={data} />
        <IconButton
          name="print"
          width="32"
          height="32"
          viewBox="0 0 25 25"
          handleClick={() => printDiv('printRates')}
        />
      </div>
      {data && (
        <RatesPaper
          users={data}
          selectedSearchItem={selectedSearchItem}
          handleEditUserBtnClick={handleEditUserBtnClick}
        />
      )}
      {show && (
        <EditRateModal
          clickedUserData={clickedUserData}
          hideModal={hideModal}
          resetClickedItemData={resetClickedItemData}
          updateReservedPrice={updateReservedPrice}
          addFlashMessage={addFlashMessage}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  selectedSearchItem: state.selected.value,
  clickedUserData: state.selected.data,
  show: state.modal.show,
});

const mapDispatchToProps = dispatch => ({
  rateActions: bindActionCreators(rateActions, dispatch),
  selectedActions: bindActionCreators(selectedActions, dispatch),
  modalActions: bindActionCreators(modalActions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatesContainer);
