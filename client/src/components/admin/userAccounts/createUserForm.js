import React from 'react';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import PasswordField from '../../../shared/form/passwordField';
import MealPriceField from '../../../shared/form/mealPriceField';
import FormButton from '../../../shared/form/formButton';
import BankAccountForm from './bankAccountForm';
import BusinessTypeForm from './businessTypeForm';

const CreateUserForm = props => {
  const {
    values: { bankAccountId, businessType },
    bankAccount,
    isSubmitting,
    setFieldValue,
  } = props;
  const change = (e, name, shouldValidate) => {
    e.persist();
    const inputValue = e.target.value;
    let value;
    if (name === 'bankAccountId' || name === 'businessType') {
      value = inputValue;
    }
    return setFieldValue(name, value, shouldValidate);
  };
  return (
    <React.Fragment>
      <div className="mh1 mb2 user-form">
        <div className="user-form--left">
          <FormikField
            label="고객명"
            name="companyName"
            type="text"
            icon="filledUser"
            styleName="textFieldC"
            placeholder="(한글) 유청"
            required
          />
          <FormikField
            label="고객 아이디"
            name="username"
            type="text"
            icon="user"
            styleName="textFieldC"
            placeholder="(영문) yucheong"
            required
          />
          <PasswordField
            label="비밀번호"
            name="password"
            styleName="textFieldC"
            placeholder="( 숫자 or 숫자+영문 조합 )"
          />
          <PasswordField
            label="비밀번호 확인"
            name="confirmPassword"
            styleName="textFieldC"
          />
        </div>
        <div className="user-form--right">
          <FormikField
            label="연락처"
            name="contactNo"
            type="text"
            icon="phone"
            styleName="textFieldC"
            placeholder="054 - 745 - 0999"
            required
          />
          <MealPriceField
            label="식수가격"
            name="mealPrice"
            type="text"
            icon="user"
            styleName="textFieldC"
            placeholder="5000"
          />
          <FormikField
            label="이메일"
            name="email"
            type="email"
            icon="email"
            styleName="textFieldC"
            placeholder="sleket12@hanmail.net"
            required
          />
          <div className="flex justify-center">
            <FormikField
              label="중식 식수량"
              name="lunchQty"
              type="text"
              icon="catering"
              styleName="textFieldD"
              placeholder="70"
            />
            <FormikField
              label="석식 식수량"
              name="dinnerQty"
              type="text"
              icon="catering"
              styleName="textFieldD"
              placeholder="35"
            />
          </div>
        </div>
      </div>
      <FormikField
        label="주소"
        name="address"
        type="text"
        icon="address"
        styleName="textFieldE"
        placeholder="황성동 1071-1번지 강남골프장 맞은편"
      />
      <BusinessTypeForm businessType={businessType} change={change} />
      <BankAccountForm
        bankAccountId={bankAccountId}
        bankAccount={bankAccount}
        change={change}
      />
      <div className="justify-center">
        <FormButton
          typeValue="submit"
          variantValue="contained"
          buttonName="저장"
          width="medium"
          isSubmitting={isSubmitting}
        />
      </div>
    </React.Fragment>
  );
};

export default CreateUserForm;
