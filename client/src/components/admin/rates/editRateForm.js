import React from 'react';
/* --- Components --- */
import MealPriceField from '../../../shared/form/mealPriceField';
import ExpireDateSelect from './expireDateSelect';
import FormButton from '../../../shared/form/formButton';
import IconMessage from '../../../shared/iconMessage';
import * as data from '../../../data/message';

const EditUserForm = ({
  reserveDate,
  thisMonth,
  nextMonth,
  inTwoMonths,
  handleSelectChange,
  isSubmitting,
}) => (
  <React.Fragment>
    <div className="mh2 media--justify-center">
      <div className="mh1">
        <MealPriceField
          label="변동가격"
          name="reservePrice"
          type="text"
          styleName="textFieldF"
          required
        />
        <ExpireDateSelect
          reserveDate={reserveDate}
          thisMonth={thisMonth}
          nextMonth={nextMonth}
          inTwoMonths={inTwoMonths}
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
      text={data.updateRateMessage}
      position="center"
      textStyle="icon-message--info f-mini"
    />
  </React.Fragment>
);

export default EditUserForm;
