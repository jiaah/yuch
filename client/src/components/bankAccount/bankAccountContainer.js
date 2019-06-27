import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from '@material-ui/core/Paper';
/* --- Components --- */
import IconButton from '../../shared/iconButton';
import BankTable from './bankTable';
import { bankAccountTableHeadRows } from '../../shared/data';
import Loader from '../../shared/loader';
/* --- Actions --- */
import * as modalActions from '../../actions/modalAction';
import * as bankActions from '../../actions/bankAction';
import { addFlashMessage } from '../../actions/messageAction';

const CreateBankModal = Loader({
  loader: () =>
    import('./createBankModal' /* webpackChunkName: 'CreateBankModal' */),
});

const BankAccountContainer = ({
  modalActions: { showModal, hideModal },
  bankActions: { getBankAccount, createBankAccount },
  addFlashMessage,
}) => {
  const [bankAccount, setBankAccount] = useState(null);
  const [clickedBtn, setClickedBtn] = useState(null);

  const handleCloseModal = () => hideModal();
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

  const handleEditBtnClick = async (id, sub) => {
    await handleButtonClick(sub);
  };

  const handleDeleteBtnClick = async (id, sub) => {
    await handleButtonClick(sub);
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
      <Paper className="mt2 paper-padding">
        <BankTable
          bankAccountTableHeadRows={bankAccountTableHeadRows}
          handleEditBtnClick={handleEditBtnClick}
          handleDeleteBtnClick={handleDeleteBtnClick}
          bankAccount={bankAccount}
          clickedBtn={clickedBtn}
        />
      </Paper>
      <CreateBankModal
        createBankAccount={createBankAccount}
        handleCloseModal={handleCloseModal}
        addFlashMessage={addFlashMessage}
      />
    </div>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(modalActions, dispatch),
  bankActions: bindActionCreators(bankActions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BankAccountContainer);
