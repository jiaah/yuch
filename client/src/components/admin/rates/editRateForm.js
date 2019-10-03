import React from 'react';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import ExpireDateSelect from './expireDateSelect';
import FormButton from '../../../shared/form/formButton';
import IconMessage from '../../../shared/iconMessage';
import {
  updateRateMessageA,
  updateRateMessageB,
  updateRateMessageC,
} from '../../../data/message';

const EditUserForm = ({
  selectedDate,
  thisMonth,
  nextMonth,
  lastMonth,
  handleSelectChange,
  isSubmitting,
}) => (
  <React.Fragment>
    <div className="mh2 media--justify-center">
      <div className="mh1">
        <FormikField
          label="변동가격"
          name="reservePrice"
          type="text"
          icon="money"
          styleName="textFieldF"
          required
        />
        <ExpireDateSelect
          reserveDate={selectedDate}
          thisMonth={thisMonth}
          nextMonth={nextMonth}
          lastMonth={lastMonth}
          handleSelectChange={handleSelectChange}
        />
      </div>
      <FormButton
        typeValue="submit"
        variantValue="contained"
        buttonName="수정"
        width="medium"
        isSubmitting={isSubmitting}
      />
    </div>
    <IconMessage
      name="info"
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fillOuter="#2196F3"
      fillInner="#ffffff"
      text={updateRateMessageA}
      position="end"
      textStyle="icon-message--info f-mini"
    />
    <IconMessage
      name="info"
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fillOuter="#2196F3"
      fillInner="#ffffff"
      text={updateRateMessageB}
      position="end"
      iconBoxStyle="mt2"
      textStyle="icon-message--info f-mini"
    />
    <IconMessage
      name="info"
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fillOuter="#2196F3"
      fillInner="#ffffff"
      text={updateRateMessageC}
      position="end"
      iconBoxStyle="mt2"
      textStyle="icon-message--info f-mini"
    />
  </React.Fragment>
);

export default EditUserForm;
