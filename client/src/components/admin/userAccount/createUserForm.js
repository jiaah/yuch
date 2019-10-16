import React from 'react';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import PasswordField from '../../../shared/form/passwordField';
import FormButton from '../../../shared/form/formButton';
import RadioButtonFormControl from '../../../shared/form/radioButtonFormControl';
import BusinessTypeOptions from './businessTypeOptions';
import BankAccountOptions from './bankAccountOptions';

const CreateUserForm = props => {
  const { bankAccount, isSubmitting } = props;

  return (
    <React.Fragment>
      <div className="mh1 mb2 media--justify-around">
        <div className="media--flex-column-m">
          <FormikField
            label="고객명"
            name="companyName"
            type="text"
            icon="filledUser"
            styleName="textFieldC"
            placeholder="유청"
            required
          />
          <FormikField
            label="고객 아이디"
            name="username"
            type="text"
            icon="user"
            styleName="textFieldC"
            placeholder="(영문) yuchung"
            required
          />
          <PasswordField
            label="비밀번호"
            name="password"
            styleName="textFieldC"
            placeholder="(숫자 or 숫자+영문 조합)"
            required
          />
          <PasswordField
            label="비밀번호 확인"
            name="confirmPassword"
            styleName="textFieldC"
            required
          />
          <FormikField
            label="주소"
            name="address"
            type="text"
            icon="address"
            styleName="textFieldC"
          />
        </div>
        <div className="media--flex-column-m">
          <FormikField
            label="연락처"
            name="contactNo"
            type="text"
            icon="phone"
            styleName="textFieldC"
            placeholder="000-000-0000"
            required
          />
          <FormikField
            label="식수가격"
            name="mealPrice"
            type="text"
            icon="money"
            styleName="textFieldC"
            placeholder="5000"
            required
          />
          <FormikField
            label="이메일"
            name="email"
            type="email"
            icon="email"
            styleName="textFieldC"
            placeholder="yuchung@hanmail.net"
            required
          />
          <FormikField
            label="사업자번호"
            name="businessNo"
            type="text"
            icon="payment"
            styleName="textFieldC"
            placeholder="000-00-00000"
          />
          <FormikField
            label="서비스 시작일"
            name="startDate"
            type="date"
            icon="calendar"
            styleName="textFieldC"
            required
          />
        </div>
      </div>
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
        <FormikField
          label="야식 식수량"
          name="lateNightSnackQty"
          type="text"
          icon="catering"
          styleName="textFieldD"
          placeholder="35"
        />
      </div>
      <RadioButtonFormControl
        label="비지니스 타입"
        icon="ratio"
        formClassName="form--radioBtn"
        component={<BusinessTypeOptions name="businessType" />}
        required
      />
      <RadioButtonFormControl
        label="입금 계좌번호"
        icon="ratio"
        formClassName="form--radioBtn"
        component={
          <BankAccountOptions name="bankAccountId" bankAccount={bankAccount} />
        }
        required
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
