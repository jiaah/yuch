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
    <div className="mh2 rate-edit-form">
      <div className="flex justify-center">
        <MealPriceField
          label="변동가격"
          name="reservePrice"
          type="text"
          styleName="textFieldF"
          placeholder="8000"
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
      <div className="rate-edit-form--btn">
        <FormButton
          typeValue="submit"
          variantValue="contained"
          buttonName="수정"
          width="medium"
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
    <div className="flex justify-end pw3">
      <IconMessage
        name="info"
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fillOuter="#2196F3"
        fillInner="#ffffff"
        text={data.updateRateMessage}
        classes="icon-message--info f-mini"
      />
    </div>
  </React.Fragment>
);

export default EditUserForm;
