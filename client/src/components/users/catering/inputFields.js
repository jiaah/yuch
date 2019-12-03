import React from 'react';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';

const InputFields = ({
  isLunchQtyDisabled,
  isDinnerQtyDisabled,
  businessType,
}) => (
  <div className="pb3">
    <div className="phone">
      <FormikField
        label="중식"
        name="lunchQty"
        type="number"
        icon="catering"
        styleName="textFieldC"
        variant="outlined"
        disabled={isLunchQtyDisabled}
      />
      <FormikField
        label="석식"
        name="dinnerQty"
        type="number"
        icon="catering"
        styleName="textFieldC"
        variant="outlined"
        disabled={isDinnerQtyDisabled}
      />
      <FormikField
        label="야식"
        name="lateNightSnackQty"
        type="number"
        icon="catering"
        styleName="textFieldC"
        variant="outlined"
        disabled={isDinnerQtyDisabled || businessType === 'restaurant'}
      />
    </div>
    <table className="desktop">
      <tbody>
        <tr>
          <td className="table-input--pb vr">중식</td>
          <td className="vr">석식</td>
          <td className="">야식</td>
        </tr>
        <tr>
          <td className="hr catering--hr" />
        </tr>
        <tr>
          <td className="pw1 pt3 vr">
            <FormikField
              name="lunchQty"
              type="number"
              icon="catering"
              styleName="textFieldC"
              variant="outlined"
              disabled={isLunchQtyDisabled}
            />
          </td>
          <td className="pw1 vr">
            <FormikField
              name="dinnerQty"
              type="number"
              icon="catering"
              styleName="textFieldC"
              variant="outlined"
              disabled={isDinnerQtyDisabled}
            />
          </td>
          <td className="pw1">
            <FormikField
              name="lateNightSnackQty"
              type="number"
              icon="catering"
              styleName="textFieldC"
              variant="outlined"
              disabled={isDinnerQtyDisabled || businessType === 'restaurant'}
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default InputFields;
