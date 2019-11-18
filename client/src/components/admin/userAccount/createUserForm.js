import React from 'react';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import FormButton from '../../../shared/form/formButton';
import RadioButtonFormControl from '../../../shared/form/radioButtonFormControl';
import BusinessTypeOptions from './businessTypeOptions';
import BankAccountOptions from './bankAccountOptions';
import IconMessage from '../../../shared/iconMessage';

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
            label="서비스 시작일"
            name="startDate"
            type="date"
            icon="calendar"
            styleName="textFieldC"
            required
          />
        </div>
        <div className="media--flex-column-m">
          <FormikField
            label="식수가격"
            name="mealPrice"
            type="number"
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
            label="주소"
            name="address"
            type="text"
            icon="address"
            styleName="textFieldC"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <FormikField
          label="중식 식수량"
          name="lunchQty"
          type="number"
          icon="catering"
          styleName="textFieldD"
        />
        <FormikField
          label="석식 식수량"
          name="dinnerQty"
          type="number"
          icon="catering"
          styleName="textFieldD"
        />
        <FormikField
          label="야식 식수량"
          name="lateNightSnackQty"
          type="number"
          icon="catering"
          styleName="textFieldD"
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
      <IconMessage
        name="info"
        width="15"
        height="18"
        viewBox="0 0 20 20"
        fillOuter="#2196F3"
        fillInner="#ffffff"
        text="비밀번호는 ' - ' 를 제외한 연락처로 자동 설정됩니다."
        position="center"
        iconBoxStyle="mt4"
        textStyle="icon-message--info f-mini"
      />
    </React.Fragment>
  );
};

export default CreateUserForm;
