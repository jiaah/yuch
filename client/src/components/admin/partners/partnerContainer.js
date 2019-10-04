import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import IconButton from '../../../shared/form/iconButton';
import Paper from '../../../shared/paper';
import Loader from '../../loader';
import Table from './partnerTable';
import { partnerColumns } from '../../../data/data';
import { printDiv } from '../../../utils/print';
import SearchBar from '../../../shared/searchBar/searchBarContainer';
/* --- Actions --- */
import * as modalActions from '../../../actions/modalAction';
import * as selectedActions from '../../../actions/selectedAction';
import { addFlashMessage } from '../../../actions/messageAction';
import * as partnerActions from '../../../actions/partnerAction';

const Modal = Loader({
  loader: () => import('./modal' /* webpackChunkName: 'Modal' */),
});

const Container = ({
  modalActions: { showModal, hideModal },
  selectedActions: {
    saveClickedItemData,
    resetClickedItemData,
    saveSelectedItemValue,
    resetSelectedItemValue,
  },
  partnerActions: { getPartners, createPartner, editPartner, deletePartner },
  addFlashMessage,
  clickedUserData,
  selectedSearchItem,
}) => {
  const [data, setData] = useState([]);
  const [clickedBtn, setClickedBtn] = useState(null);

  // selected row on click
  const [selectedRow, setSelectedRow] = useState(null);
  const onFocusOnSelectdRow = id => setSelectedRow(id);
  const offFocusOnSelectdRow = () => setSelectedRow(null);

  const fetchData = async () => {
    const res = await getPartners();
    if (res.error)
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    return setData(res);
  };

  useEffect(() => {
    fetchData();
    return () => {
      Promise.all([
        clickedUserData.length !== 0 && resetClickedItemData(),
        selectedSearchItem && resetSelectedItemValue(),
      ]);
    };
  }, []);

  const handleButtonClick = sub => {
    Promise.all([setClickedBtn(sub), showModal()]);
  };

  // Row Focusing
  const handleTableRowClick = id => {
    // select
    onFocusOnSelectdRow(id);
    // search
    if (selectedSearchItem) resetSelectedItemValue();
    // create, edit
    if (clickedUserData.length !== 0) resetClickedItemData();
  };
  const handleSuggestionSelected = () => {
    if (selectedRow) offFocusOnSelectdRow();
    if (clickedUserData.length !== 0) resetClickedItemData();
  };

  return (
    <div className="container-a r--w-80">
      <h2>거래처</h2>
      <div className="paper-label-box justify-between">
        <SearchBar
          data={data}
          handleSuggestionSelected={handleSuggestionSelected}
          handleResetSearch={() => {}}
        />
        <div className="flex">
          <IconButton
            handleClick={() => handleButtonClick('create')}
            name="add"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          />
          <IconButton
            name="print"
            width="32"
            height="32"
            viewBox="0 0 25 25"
            handleClick={() => printDiv('print')}
          />
        </div>
      </div>
      <div id="print">
        <Paper
          component={
            data && data.length !== 0 ? (
              <Table
                data={data}
                clickedBtn={clickedBtn}
                selectedRow={selectedRow}
                selectedSearchItem={selectedSearchItem}
                saveClickedItemData={saveClickedItemData}
                saveSelectedItemValue={saveSelectedItemValue}
                handleButtonClick={handleButtonClick}
                handleTableRowClick={handleTableRowClick}
                partnerColumns={partnerColumns}
                clickedUserData={clickedUserData}
              />
            ) : (
              <h3 className="mt4 mb4">등록된 데이터가 없습니다.</h3>
            )
          }
        />
      </div>
      {clickedBtn && (
        <Modal
          clickedBtn={clickedBtn}
          clickedUserData={clickedUserData}
          selectedSearchItem={selectedSearchItem}
          hideModal={hideModal}
          addFlashMessage={addFlashMessage}
          resetSelectedItemValue={resetSelectedItemValue}
          saveClickedItemData={saveClickedItemData}
          resetClickedItemData={resetClickedItemData}
          createPartner={createPartner}
          editPartner={editPartner}
          deletePartner={deletePartner}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  clickedUserData: state.selected.data,
  selectedSearchItem: state.selected.value,
  partners: state.partner.data,
});

const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(modalActions, dispatch),
  selectedActions: bindActionCreators(selectedActions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
  partnerActions: bindActionCreators(partnerActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
