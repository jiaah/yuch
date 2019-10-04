import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import IconButton from '../../../shared/form/iconButton';
import Paper from '../../../shared/paper';
import Loader from '../../loader';
import Table from './Table';
import { employeeColumns } from '../../../data/data';
import { bankAccountValidation } from '../../formValidation';
/* --- Actions --- */
import * as modalActions from '../../../actions/modalAction';
import * as bankActions from '../../../actions/bankAction';
import * as selectedActions from '../../../actions/selectedAction';
import { addFlashMessage } from '../../../actions/messageAction';

const Modal = Loader({
  loader: () => import('./Modal' /* webpackChunkName: 'Modal' */),
});

const Container = ({
  modalActions: { showModal, hideModal },
  bankActions: {
    getBankAccount,
    createBankAccount,
    editBankAccount,
    deleteBankAccount,
  },
  selectedActions: {
    saveClickedItemData,
    resetClickedItemData,
    saveSelectedItemValue,
    resetSelectedItemValue,
  },
  addFlashMessage,
  clickedUserData,
  selectedSearchItem,
}) => {
  const [data, setData] = useState([]);
  const [clickedBtn, setClickedBtn] = useState(null);

  const fetchBankAccount = async () => {
    const bankAccounts = await getBankAccount();
    if (bankAccounts.error)
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    return setData(bankAccounts);
  };

  useEffect(() => {
    fetchBankAccount();
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

  return (
    <div className="container-a r--w-60">
      <h2>유청 직원</h2>
      <div className="paper-label-box justify-end">
        <div className="flex">
          <IconButton
            handleClick={() => handleButtonClick('create')}
            name="add"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          />
        </div>
      </div>
      <Paper
        component={
          <Table
            employeeColumns={employeeColumns}
            data={data}
            clickedBtn={clickedBtn}
            saveClickedItemData={saveClickedItemData}
            saveSelectedItemValue={saveSelectedItemValue}
            handleButtonClick={handleButtonClick}
          />
        }
      />
      {clickedBtn && (
        <Modal
          resetClickedItemData={resetClickedItemData}
          hideModal={hideModal}
          bankAccountValidation={bankAccountValidation}
          clickedBtn={clickedBtn}
          clickedUserData={clickedUserData}
          selectedSearchItem={selectedSearchItem}
          createBankAccount={createBankAccount}
          editBankAccount={editBankAccount}
          deleteBankAccount={deleteBankAccount}
          addFlashMessage={addFlashMessage}
          resetSelectedItemValue={resetSelectedItemValue}
          data={data}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  clickedUserData: state.selected.data,
  selectedSearchItem: state.selected.value,
});

const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(modalActions, dispatch),
  bankActions: bindActionCreators(bankActions, dispatch),
  selectedActions: bindActionCreators(selectedActions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
