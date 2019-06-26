import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from '@material-ui/core/Paper';
/* --- Components --- */
import IconButton from '../../shared/iconButton';
import CreateBankModal from './createBankModal';
import BankTable from './bankTable';
import { bankAccountTableHeadRows } from '../../shared/data';
/* --- Actions --- */
import * as modalActions from '../../actions/modalAction';
import * as bankActions from '../../actions/bankAction';

const BankAccountContainer = ({
  modalActions: { showModal, hideModal },
  bankActions: { getBankAccount },
  show,
}) => {
  const [bankAccount, setBankAccount] = useState(null);
  const [clickedBtn, setClickedBtn] = useState(null);

  const closeModal = () => hideModal();
  const fetchBankAccount = async () => {
    const bankAccount = await getBankAccount();
    setBankAccount(bankAccount);
  };

  useEffect(() => {
    fetchBankAccount();
  }, []);

  const handleButtonClick = sub =>
    Promise.all([showModal(), setClickedBtn(sub)]);

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
          handleEditBankBtnClick={handleButtonClick('edit')}
          bankAccount={bankAccount}
        />
      </Paper>
      {show &&
        clickedBtn === 'create' && (
          <CreateBankModal show={show} handleCloseModal={closeModal} />
        )}
    </div>
  );
};

const mapStateToProps = state => ({
  show: state.modal.show,
});

const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(modalActions, dispatch),
  bankActions: bindActionCreators(bankActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BankAccountContainer);
