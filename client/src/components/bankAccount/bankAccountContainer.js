import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from '@material-ui/core/Paper';
/* --- Components --- */
import IconButton from '../../shared/iconButton';
import BankTable from './bankTable';
import { bankAccountTableHeadRows } from '../../shared/data';
import Loader from '../../shared/loader';
import { bankAccountValidation } from '../../shared/formValidation';
/* --- Actions --- */
import * as modalActions from '../../actions/modalAction';
import * as bankActions from '../../actions/bankAction';
import * as selectedActions from '../../actions/selectedAction';
import { addFlashMessage } from '../../actions/messageAction';

const CreateBankModal = Loader({
  loader: () =>
    import('./createBankModal' /* webpackChunkName: 'CreateBankModal' */),
});

const EditBankModal = Loader({
  loader: () =>
    import('./EditBankModal' /* webpackChunkName: 'EditBankModal' */),
});

const BankAccountContainer = ({
  modalActions: { showModal, hideModal },
  bankActions: { getBankAccount, createBankAccount, editBankAccount },
  selectedActions: { saveClickedItemData, resetClickedItemData },
  addFlashMessage,
  clickedUserData,
}) => {
  const [bankAccount, setBankAccount] = useState(null);
  const [clickedBtn, setClickedBtn] = useState(null);

  const handleCloseModal = () => {
    if (clickedBtn === 'edit') {
      return Promise.all([resetClickedItemData(), hideModal()]);
    }
    return hideModal();
  };
  const fetchBankAccount = async () => {
    const bankAccount = await getBankAccount();
    setBankAccount(bankAccount);
  };

  useEffect(() => {
    fetchBankAccount();
  }, []);

  const getClickedUserData = async bankId => {
    const bankData = await bankAccount.filter(b => b.id === bankId);
    return bankData[0];
  };
  const handleButtonClick = sub => {
    Promise.all([setClickedBtn(sub), showModal()]);
  };
  const handleEditBtnClick = async id => {
    const bankData = await getClickedUserData(id);
    await saveClickedItemData(bankData);
    return handleButtonClick('edit');
  };

  const handleDeleteBtnClick = async id => {
    await handleButtonClick('delete');
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
      {clickedBtn === 'create' ? (
        <CreateBankModal
          bankAccountValidation={bankAccountValidation}
          createBankAccount={createBankAccount}
          handleCloseModal={handleCloseModal}
          addFlashMessage={addFlashMessage}
        />
      ) : clickedBtn === 'edit' ? (
        <EditBankModal
          bankAccountValidation={bankAccountValidation}
          editBankAccount={editBankAccount}
          handleCloseModal={handleCloseModal}
          addFlashMessage={addFlashMessage}
          clickedUserData={clickedUserData}
        />
      ) : null}
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
