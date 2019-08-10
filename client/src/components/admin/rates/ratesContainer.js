import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import RatesPaper from './ratesPaper';
import SearchBar from '../../../shared/searchBar/searchBarContainer';
import Loader from '../../../shared/loader';
import IconButton from '../../../shared/form/iconButton';
import { printDiv } from '../../../utils/print';
import AdminConfirmContainer from '../../../shared/adminConfirm/adminConfirmContainer';
import Modal from '../../../shared/modal';
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
  const [data, setData] = useState([]);
  const [adminConfirmed, setAdminConfirmed] = useState(false);
  const handleAdminConfirmed = () => {
    setAdminConfirmed(true);
    return hideModal();
  };
  const closeAdminCinfirmModal = async () => {
    addFlashMessage(
      'warning',
      '중요한 데이터 보안을 위해 비밀번호 확인이 필요합니다.',
    );
    return hideModal();
  };

  // only renders mealprice data when admin user is confirmed
  const dataToRender = adminConfirmed ? data : [];

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
    // open admin password checking modal on page load
    showModal();
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
      <RatesPaper
        users={dataToRender}
        selectedSearchItem={selectedSearchItem}
        handleEditUserBtnClick={handleEditUserBtnClick}
      />
      {show &&
        adminConfirmed && (
          <EditRateModal
            clickedUserData={clickedUserData}
            hideModal={hideModal}
            resetClickedItemData={resetClickedItemData}
            updateReservedPrice={updateReservedPrice}
            addFlashMessage={addFlashMessage}
          />
        )}
      {/* admin password check */}
      {show &&
        !adminConfirmed && (
          <Modal
            title=""
            handleClose={closeAdminCinfirmModal}
            component={
              <AdminConfirmContainer
                handleButtonClick={handleAdminConfirmed}
                confirmType="create"
              />
            }
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
