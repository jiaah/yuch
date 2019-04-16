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
/* --- Actions --- */
import * as authActions from '../../actions/authAction';
import * as modalActions from '../../actions/modalAction';

const SimpleModal = Loader({
  loader: () =>
    import('../../shared/simpleModal' /* webpackChunkName: 'simpleModal' */),
});
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object({
  companyName: Yup.string('').required('업체 상호명을 한글로 입력하세요.'),
  username: Yup.string('').required('고객 로그인 아이디를 입력하세요.'),
  password: Yup.string('')
    .min(8, '비밀번호는 숫자를 포함한 최소 8자 이상이어야 합니다.')
    .matches(/(?=.*[0-9])/, '숫자를 포함하여야 합니다.')
    .required('비밀번호를 입력하세요.'),
  confirmPassword: Yup.string('')
    .required('비밀번호를 입력하세요.')
    .oneOf([Yup.ref('password')], '비밀번호가 일치하지 않습니다.'),
  contactNumber: Yup.string()
    .matches(
      phoneRegExp,
      '전화 번호에 잘못된 문자를 입력하거나 잘못된 형식의 전화 번호입니다.',
    )
    .required('연락처를 입력하세요.'),
  email: Yup.string().email('이메일 주소가 유효하지 않습니다.'),
  mealPrice: Yup.number()
    .typeError('숫자만 입력하세요.')
    .positive('1이상의 자연수만 입력하세요.')
    .integer('1이상의 자연수만 입력하세요.')
    .required('식수가격을 입력하세요.'),
  lunchQuantity: Yup.number()
    .typeError('숫자만 입력하세요.')
    .integer('1이상의 자연수만 입력하세요.')
    .positive('1이상의 자연수만 입력하세요.'),
  dinnerQuantity: Yup.number()
    .typeError('숫자만 입력하세요.')
    .integer('1이상의 자연수만 입력하세요.')
    .positive('1이상의 자연수만 입력하세요.'),
});

class UsersContainer extends React.Component {
  showModal = ev => {
    ev.preventDefault();

    return this.props.modalActions.showModal();
  };

  handleClose = () => {
    this.props.modalActions.hideModal();
  };

  handleCreateUser = async (values, { setSubmitting, resetForm }) => {
    const { confirmPassword, bankAccountOption, ...others } = values;
    const bankAccount = parseInt(bankAccountOption, 10);
    const userInfo = {
      bankAccount,
      ...others,
    };

    try {
      const userData = await this.props.authActions.createUser(userInfo);
      alert(`${userData} 고객정보가 등록되었습니다.`);
      resetForm({});
      this.handleClose();
    } catch (error) {
      alert(
        `${
          values.companyName
        } 고객 등록에 실패하였습니다. 이미 존재하는 '고객명'이나 '고객아이디' 입니다. 서버로부터 받은 에러 메시지: ${
          this.props.errorMessage.data.detail
        }`,
      );
    }
    setSubmitting(false);
  };

  render() {
    const values = {
      username: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      contactNumber: '',
      email: '',
      mealPrice: '',
      lunchQuantity: '',
      dinnerQuantity: '',
      bankAccountOption: '1',
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
