import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import IconButton from '../../../shared/iconButton';
import Paper from '../../../shared/paper';
import Loader from '../../../shared/loader';
import BankTable from './bankTable';
import { bankAccountTableHeadColumns } from '../../../data/data';
import {
  bankAccountPageInfoA,
  bankAccountPageInfoB,
} from '../../../data/message';
import { bankAccountValidation } from '../../formValidation';
import IconMessage from '../../../shared/iconMessage';
/* --- Actions --- */
import * as modalActions from '../../../actions/modalAction';
import * as bankActions from '../../../actions/bankAction';
import * as selectedActions from '../../../actions/selectedAction';
import { addFlashMessage } from '../../../actions/messageAction';

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
    <div className="container r--w-50">
      <h2>유청 은행 계좌</h2>
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
          <BankTable
            bankAccountTableHeadColumns={bankAccountTableHeadColumns}
            bankAccount={bankAccount}
            clickedBtn={clickedBtn}
            saveClickedItemData={saveClickedItemData}
            saveSelectedItemValue={saveSelectedItemValue}
            handleButtonClick={handleButtonClick}
          />
        }
      />
      <div className="flex justify-end mt3 pw1">
        <IconMessage
          name="info"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fillOuter="#2196F3"
          fillInner="#ffffff"
          text={bankAccountPageInfoA}
          classes="icon-message--info"
        />
      </div>
      <div className="flex justify-end mt2 pw1">
        <IconMessage
          name="info"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fillOuter="#2196F3"
          fillInner="#ffffff"
          text={bankAccountPageInfoB}
          classes="icon-message--info"
        />
      </div>
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
