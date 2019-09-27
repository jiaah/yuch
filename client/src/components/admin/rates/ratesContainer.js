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
import {
  keepScrollPosition,
  saveYposition,
} from '../../../helpers/scrollPosition';
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
    saveSelectedItemValue,
    resetSelectedItemValue,
    saveClickedItemData,
    resetClickedItemData,
  },
  handleAdminVerificationStatus,
  addFlashMessage,
  isAdminVerified,
  selectedItemValue,
  clickedUserData,
  show,
}) => {
  const [data, setData] = useState([]);

  // selected row on click
  const [selectedRow, setSelectedRow] = useState(null);
  const setfocusOnSelectdRow = id => setSelectedRow(id);
  const removeFocusOnSelectdRow = () => setSelectedRow(null);

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
    fetchCateringRates();
    keepScrollPosition();
    return () =>
      Promise.all([
        selectedItemValue !== null ? resetSelectedItemValue() : null,
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

    // set focus on editing row
    await saveSelectedItemValue(userData.userId);
    // to prevent from having multiple selected rows.
    if (selectedRow) await removeFocusOnSelectdRow();
    return showModal();
  };

  const handleTableRowClick = id => {
    setfocusOnSelectdRow(id);
    // unselect the selected row to prevent from having multiple selected rows.
    if (selectedItemValue) resetSelectedItemValue();
  };

  // funcions that runs after search component
  const handleSuggestionSelected = () => {
    if (selectedRow) removeFocusOnSelectdRow();
  };
  const handleResetSearch = () => resetSelectedItemValue();
  const renderAllUsers = () => resetSelectedItemValue();

  // only renders mealprice data when admin user is confirmedconsole.log();
  const dataToRender = isAdminVerified ? data : [];

  return (
    <div className="container-a r--w-80">
      <h2
        className="pointer"
        title="모든 고객 계정 보기"
        onClick={renderAllUsers}
      >
        식수가격
      </h2>
      <div className="paper-label-box flex justify-between">
        <SearchBar
          data={data}
          handleSuggestionSelected={handleSuggestionSelected}
          handleResetSearch={handleResetSearch}
        />
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
        selectedItemValue={selectedItemValue}
        handleEditUserBtnClick={handleEditUserBtnClick}
        selectedRow={selectedRow}
        handleTableRowClick={handleTableRowClick}
      />
      {isAdminVerified &&
        clickedUserData.length !== 0 && (
          <EditRateModal
            clickedUserData={clickedUserData}
            hideModal={hideModal}
            updateReservedPrice={updateReservedPrice}
            addFlashMessage={addFlashMessage}
            saveYposition={saveYposition}
          />
        )}
      <AdminVerificationModal />
    </div>
  );
};

const mapStateToProps = state => ({
  selectedItemValue: state.selected.value,
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
