import React from 'react';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import MealPriceField from '../../../shared/form/mealPriceField';
import RadioButtonFormControl from '../../../shared/form/radioButtonFormControl';
import BusinessTypeOptions from './businessTypeOptions';
import BankAccountOptions from './bankAccountOptions';
import FormButton from '../../../shared/form/formButton';
import Button from '../../../shared/form/button';
import IconButton from '../../../shared/form/iconButton';
import IconMessage from '../../../shared/iconMessage';

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
        <FormikField
          label="연락처"
          name="contactNo"
          type="text"
          icon="phone"
          styleName="textFieldC"
          placeholder="054-745-0999"
          required
        />
      </div>
      <div className="media--flex-column-m">
        <MealPriceField
          label="식수가격"
          name="mealPrice"
          type="text"
          icon="user"
          styleName="textFieldC"
          disabled
        />
        <FormikField
          label="이메일"
          name="email"
          type="email"
          icon="email"
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
      icon="bankAccount"
      formClassName="form--radioBtn"
      component={<BusinessTypeOptions name="businessType" />}
      required
    />
    <RadioButtonFormControl
      label="입금 계좌번호"
      icon="bankAccount"
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
          buttonName="서비스 종료"
          width="medium"
          handleButtonClick={() => showSubModal('service')}
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
            handleClick={() => showSubModal('delete')}
          />
        </div>
        <IconMessage
          name="warning"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fillOuter="#ed4337"
          fillInner="#ffffff"
          text="고객에 관한 모든 정보가 삭제됩니다."
          position="end"
          iconBoxStyle="reverse-between--icon-msg"
          textStyle="icon-message--warning reverse-between--icon-msg--p"
        />
      </div>
    </div>
  </React.Fragment>
);

export default EditUserForm;
