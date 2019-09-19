import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import RatesPaper from './ratesPaper';
import SearchBar from '../../../shared/searchBar/searchBarContainer';
import Loader from '../../loader';
import IconButton from '../../../shared/form/iconButton';
import { printDiv } from '../../../utils/print';
import AdminVerificationModal from '../../../shared/adminVerification/adminVerificationModal';
import { keepScrollPosition } from '../../../helpers/scrollPosition';
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
  show,
}) => {
  const [data, setData] = useState([]);
  // selected row on click
  const [selectedRow, setSelectedRow] = useState('');
  const [editBtnClickedRow, setEditBtnClickedRow] = useState('');
  const handleTableRowClick = id => {
    setSelectedRow(id);
    // unselect the selected row to prevent from having multiple selected rows.
    if (editBtnClickedRow !== '') setEditBtnClickedRow('');
  };
  const resetTableRowClick = () => setSelectedRow('');

  const fetchCateringRates = async () => {
    const res = await getCateringRates();
    if (res.error)
      addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    if (res.length === 0)
      addFlashMessage('info', '데이터에 저장된 업체정보가 없습니다.');
    setData(res);
  };

  useEffect(() => {
    // opens the admin password checking modal on page load
    if (!isAdminVerified) {
      showModal();
    }
    // keep edit button selected row on browser refresh
    if (clickedUserData.length !== 0) {
      setEditBtnClickedRow(clickedUserData.userId);
    }
    fetchCateringRates();
    keepScrollPosition();
    return () =>
      Promise.all([
        selectedSearchItem !== null ? resetSelectedItemValue() : null,
        clickedUserData.length !== 0 ? resetClickedItemData() : null,
        isAdminVerified ? handleAdminVerificationStatus() : null,
        show ? hideModal() : null,
        renderAllUsers(),
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

    // select row (UI)
    await setEditBtnClickedRow(userData.userId);
    // to prevent from having multiple selected rows.
    if (selectedRow !== '') await resetTableRowClick();
    return showModal();
  };

  const renderAllUsers = () => resetSelectedItemValue();

  // only renders mealprice data when admin user is confirmedconsole.log();
  const dataToRender = isAdminVerified ? data : [];

  return (
    <div className="container w-90">
      <h2
        className="pointer"
        title="모든 고객 계정 보기"
        onClick={renderAllUsers}
      >
        식수가격
      </h2>
      <div className="paper-label-box flex justify-between">
        <SearchBar data={data} />
        <IconButton
          name="print"
          width="32"
          height="32"
          viewBox="0 0 25 25"
          handleClick={() => printDiv('print')}
        />
      </div>
      <RatesPaper
        data={data}
        users={dataToRender}
        selectedSearchItem={selectedSearchItem}
        handleEditUserBtnClick={handleEditUserBtnClick}
        selectedRow={selectedRow}
        editBtnClickedRow={editBtnClickedRow}
        handleTableRowClick={handleTableRowClick}
      />
      {isAdminVerified &&
        clickedUserData.length !== 0 && (
          <EditRateModal
            clickedUserData={clickedUserData}
            hideModal={hideModal}
            updateReservedPrice={updateReservedPrice}
            addFlashMessage={addFlashMessage}
          />
        )}
      <AdminVerificationModal />
    </div>
  );
};

const mapStateToProps = state => ({
  selectedSearchItem: state.selected.value,
  clickedUserData: state.selected.data,
  isAdminVerified: state.isAdminVerified.isAdminVerified,
  show: state.modal.show,
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
