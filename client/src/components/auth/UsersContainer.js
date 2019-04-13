/* eslint-disable no-alert */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
/* --- Components --- */
import Button from '../../shared/button';
import Form from './userForm';
import Loader from '../../shared/loader';
import { userAccountInputChecker } from './inputChecker';
/* --- Actions --- */
import * as authActions from '../../actions/authAction';
import * as modalActions from '../../actions/modalAction';

const SimpleModal = Loader({
  loader: () =>
    import('../../shared/simpleModal' /* webpackChunkName: 'simpleModal' */),
});

const validationSchema = Yup.object({
  companyName: Yup.string('').required('업체 상호명을 한글로 입력하세요.'),
  username: Yup.string('').required('고객 로그인 아이디를 입력하세요.'),
  password: Yup.string('')
    .min(8, '비밀번호는 8자 이상이여야 합니다.')
    .required('비밀번호를 입력하세요.'),
  confirmPassword: Yup.string('')
    .required('비밀번호를 입력하세요.')
    .oneOf([Yup.ref('password')], '비밀번호가 일치하지 않습니다.'),
  contactNumber: Yup.number()
    .typeError('숫자만 입력하세요.')
    .required('연락처를 입력하세요.'),
  mealPrice: Yup.string('숫자만 입력하세요.')
    .max(4, '천원단위까지만 입력가능합니다.')
    .required('식수가격을 입력하세요.'),
  lunchQuantity: Yup.string('숫자만 입력하세요.'),
  dinnerQuantity: Yup.string('숫자만 입력하세요.'),
});

class UsersContainer extends React.Component {
  showModal = ev => {
    ev.preventDefault();

    return this.props.modalActions.showModal();
  };

  handleClose = () => {
    this.props.modalActions.hideModal();
  };

  handleCreateUser = async (values, actions) => {
    const { confirmPassword, ...others } = values;
    const userInfo = {
      ...others,
    };

    // Input fields error's checked in the form,
    // this requires to prevent from making unnecessary http request
    const isInputFilledOut = await userAccountInputChecker(values);

    if (isInputFilledOut === null) {
      return actions.setSubmitting(false);
    }
    const userData = await this.props.authActions.createUser(userInfo);
    if (!userData || userData === undefined) {
      alert(
        `${
          values.companyName
        } 고객 등록에 실패하였습니다. 이미 존재하는 '고객명'이나 '고객아이디' 입니다. 서버로부터 받은 에러 메시지: ${
          this.props.errorMessage.data.detail
        }`,
      );
      return actions.setSubmitting(false);
    }
    await alert(`${userData} 고객정보가 등록되었습니다.`);
    await actions.setSubmitting(false);
    return this.handleClose();
  };

  render() {
    const values = {
      username: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      contactNumber: '',
      mealPrice: '',
      lunchQuantity: '',
      dinnerQuantity: '',
      bankAccount: '1',
    };
    return (
      <div className="users-container">
        <h1>고객계정</h1>
        <Button
          typeValue="button"
          buttonName="신규등록"
          handleButtonClick={this.showModal}
          variantValue="contained"
          width="medium"
        />
        {this.props.showModal && (
          <SimpleModal
            component={
              <Formik
                initialValues={values}
                render={props => (
                  <Form
                    {...props}
                    state={this.state}
                    handleClose={this.handleClose}
                  />
                )}
                onSubmit={this.handleCreateUser}
                validationSchema={validationSchema}
              />
            }
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showModal: state.modal.show,
  errorMessage: state.httpHandler.error,
});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
  modalActions: bindActionCreators(modalActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersContainer);
