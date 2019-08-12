import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import RatesPaper from './ratesPaper';
import SearchBar from '../../../shared/searchBar/searchBarContainer';
import Loader from '../../../shared/loader';
import IconButton from '../../../shared/form/iconButton';
import { printDiv } from '../../../utils/print';
import AdminVerificationModal from '../../../shared/adminVerification/adminVerificationModal';
/* --- Actions --- */
import * as rateActions from '../../../actions/rateAction';
import * as selectedActions from '../../../actions/selectedAction';
import * as modalActions from '../../../actions/modalAction';
import { addFlashMessage } from '../../../actions/messageAction';
import { handleAdminVerificationStatus } from '../../../actions/authAction';

const EditRateModal = Loader({
  loader: () =>
    import('./editRateModal' /* webpackChunkName: 'EditRateModal' */),
});
const RatesContainer = ({
  rateActions: { getCateringRates, updateReservedPrice },
  modalActions: { showModal, hideModal },
  selectedActions: {
    resetSelectedItemValue,
    saveClickedItemData,
    resetClickedItemData,
  },
  handleAdminVerificationStatus,
  addFlashMessage,
  isAdminVerified,
  selectedSearchItem,
  clickedUserData,
}) => {
  const [data, setData] = useState([]);

  const fetchCateringRates = async () => {
    const res = await getCateringRates();
    if (res.error)
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    if (res.length === 0)
      return addFlashMessage('info', '데이터에 저장된 업체정보가 없습니다.');
    return setData(res);
  };

  useEffect(() => {
    fetchCateringRates();
    // opens the admin password checking modal on page load
    showModal();
    return () =>
      Promise.all([
        selectedSearchItem !== null ? resetSelectedItemValue() : null,
        clickedUserData.length !== 0 ? resetClickedItemData() : null,
        isAdminVerified ? handleAdminVerificationStatus() : null,
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

  // only renders mealprice data when admin user is confirmed
  const dataToRender = isAdminVerified ? data : [];

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
      <RatesPaper
        users={dataToRender}
        selectedSearchItem={selectedSearchItem}
        handleEditUserBtnClick={handleEditUserBtnClick}
      />
      {isAdminVerified &&
        clickedUserData.length !== 0 && (
          <EditRateModal
            clickedUserData={clickedUserData}
            hideModal={hideModal}
            resetClickedItemData={resetClickedItemData}
            updateReservedPrice={updateReservedPrice}
            addFlashMessage={addFlashMessage}
          />
        )}
      {/* admin password check */}
      <AdminVerificationModal />
    </div>
  );
};

const mapStateToProps = state => ({
  selectedSearchItem: state.selected.value,
  clickedUserData: state.selected.data,
  isAdminVerified: state.isAdminVerified.isAdminVerified,
});

const mapDispatchToProps = dispatch => ({
  rateActions: bindActionCreators(rateActions, dispatch),
  selectedActions: bindActionCreators(selectedActions, dispatch),
  modalActions: bindActionCreators(modalActions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
  handleAdminVerificationStatus: () =>
    dispatch(handleAdminVerificationStatus()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatesContainer);
