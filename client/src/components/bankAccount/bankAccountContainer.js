import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import IconButton from '../../shared/iconButton';
import Paper from '../../shared/paper';
import Loader from '../../shared/loader';
import BankTable from './bankTable';
import { admin, bankAccountTableHeadRows } from '../../shared/data';
import { bankAccountValidation } from '../../shared/formValidation';
import Icon from '../../../assets/icons';
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
      <div className="flex justify-end mt3 pw1">
        <Icon
          name="info"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fillOuter="#2196F3"
          fillInner="#ffffff"
        />
        <p className="ml2" style={{ marginTop: '-.91px' }}>
          {admin.companyName} 고객 업체에게&#8201;
          <span className="c-point2">
            등록되어있는 계좌 그룹을 유지하고&#44;&#8201;
          </span>
          &#8201;계좌 정보 변경만 원하시면&#44;&#8201;&#8201;
          <span className="c-point2">계좌를 수정 해주세요&#46;</span>
        </p>
      </div>
      <div className="flex justify-end mt2 pw1">
        <Icon
          name="info"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fillOuter="#2196F3"
          fillInner="#ffffff"
        />
        <p className="ml2" style={{ marginTop: '-.91px' }}>
          <span className="c-point2">새로운 계좌 등록 혹은 삭제 시&#44;</span>
          &#8201;&#8201;&#39;계정 &#62; 고객계정&#39; 으로
          이동하여&#44;&#8201;&#8201;
          <span className="c-point2">
            반드시 새로운 계좌를 고객 업체에 등록해주세요&#46;
          </span>
        </p>
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
