import React from 'react';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import RadioButtonFormControl from '../../../shared/form/radioButtonFormControl';
import BusinessTypeOptions from './businessTypeOptions';
import BankAccountOptions from './bankAccountOptions';
import FormButton from '../../../shared/form/formButton';
import Button from '../../../shared/form/button';
import IconButton from '../../../shared/form/iconButton';
import IconMessage from '../../../shared/iconMessage';
import {
  endOfServiceMegInEditForm,
  editUserAccountMsg,
} from '../../../data/message';

const EditUserForm = ({ bankAccount, isSubmitting, showSubModal }) => (
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
          label="주소"
          name="address"
          type="text"
          icon="address"
          styleName="textFieldC"
        />
      </div>
      <div className="media--flex-column-m">
        <FormikField
          label="식수가격"
          name="mealPrice"
          type="text"
          icon="money"
          styleName="textFieldC"
          disabled
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
    </div>
    <div className="flex justify-center">
      <FormikField
        label="중식 식수량"
        name="lunchQty"
        type="text"
        icon="catering"
        styleName="textFieldD"
      />
      <FormikField
        label="석식 식수량"
        name="dinnerQty"
        type="text"
        icon="catering"
        styleName="textFieldD"
      />
      <FormikField
        label="야식 식수량"
        name="lateNightSnackQty"
        type="text"
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
      disabled
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
    <div className="media--reverse-between">
      <div>
        <Button
          typeValue="button"
          variantValue="outlined"
          buttonName="비밀번호 변경"
          width="medium"
          handleButtonClick={() => showSubModal('password')}
        />
        <FormButton
          typeValue="submit"
          variantValue="contained"
          buttonName="저장"
          width="medium"
          isSubmitting={isSubmitting}
        />
      </div>
      <div className="reverse-between--icon-box">
        <div className="reverse-between--icon">
          <IconButton
            name="delete"
            width="33"
            height="33"
            viewBox="0 0 24 24"
            handleClick={() => showSubModal('service')}
          />
        </div>
        <IconMessage
          name="warning"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fillOuter="#ed4337"
          fillInner="#ffffff"
          text={endOfServiceMegInEditForm}
          position="end"
          iconBoxStyle="reverse-between--icon-msg"
          textStyle="icon-message--warning reverse-between--icon-msg--p"
        />
      </div>
    </div>
    <IconMessage
      name="info"
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fillOuter="#2196F3"
      fillInner="#ffffff"
      text={editUserAccountMsg}
      position="center"
      iconBoxStyle="mt4"
      textStyle="icon-message--info f-mini"
    />
  </React.Fragment>
);

export default EditUserForm;
