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
  selectedActions: { saveClickedItemData, resetClickedItemData },
  addFlashMessage,
  clickedUserData,
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
    <div className="container">
      <h2>유청 은행 계좌</h2>
      <IconButton
        handleClick={() => handleButtonClick('create')}
        name="personAdd"
        width="36"
        height="36"
        viewBox="0 0 24 24"
      />
      <Paper
        component={
          <BankTable
            bankAccountTableHeadRows={bankAccountTableHeadRows}
            bankAccount={bankAccount}
            clickedBtn={clickedBtn}
            saveClickedItemData={saveClickedItemData}
            deleteBankAccount={deleteBankAccount}
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
          createBankAccount={createBankAccount}
          editBankAccount={editBankAccount}
          addFlashMessage={addFlashMessage}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => ({ clickedUserData: state.selected.data });

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
