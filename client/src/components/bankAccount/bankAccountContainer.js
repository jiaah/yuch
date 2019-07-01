import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import IconButton from '../../shared/iconButton';
import Paper from '../../shared/paper';
import Loader from '../../shared/loader';
import BankTable from './bankTable';
import { bankAccountTableHeadRows } from '../../shared/data';
import { bankAccountValidation } from '../../shared/formValidation';
/* --- Actions --- */
import * as modalActions from '../../actions/modalAction';
import * as bankActions from '../../actions/bankAction';
import * as selectedActions from '../../actions/selectedAction';
import { addFlashMessage } from '../../actions/messageAction';

const BankModal = Loader({
  loader: () => import('./bankModal' /* webpackChunkName: 'BankModal' */),
});

const BankAccountContainer = ({
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
  const [bankAccount, setBankAccount] = useState(null);
  console.log('bankAccount: ', bankAccount);
  const [clickedBtn, setClickedBtn] = useState(null);

  const fetchBankAccount = async () => {
    const bankAccount = await getBankAccount();
    setBankAccount(bankAccount);
  };

  useEffect(() => {
    fetchBankAccount();
  }, []);

  const handleButtonClick = sub => {
    Promise.all([setClickedBtn(sub), showModal()]);
  };

  return (
    <div className="container">
      <h2>유청 은행 계좌</h2>
      <div className="paper-label--box justify-end">
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
          <BankTable
            bankAccountTableHeadRows={bankAccountTableHeadRows}
            bankAccount={bankAccount}
            clickedBtn={clickedBtn}
            saveClickedItemData={saveClickedItemData}
            saveSelectedItemValue={saveSelectedItemValue}
            handleButtonClick={handleButtonClick}
          />
        }
      />
      {clickedBtn !== null && (
        <BankModal
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
          bankAccount={bankAccount}
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
)(BankAccountContainer);
