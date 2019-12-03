import React from 'react';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import FormButton from '../../../shared/form/formButton';

const CateringForm = ({ isSubmitting }) => (
  <React.Fragment>
    <div className="pb3">
      <div className="phone">
        <FormikField
          label="중식"
          name="lunch"
          type="number"
          icon="money"
          styleName="textFieldC"
          variant="outlined"
          disabled={false}
        />
        <FormikField
          label="석식"
          name="dinner"
          type="number"
          icon="money"
          styleName="textFieldC"
          variant="outlined"
          disabled={false}
        />
      </div>
      <table className="desktop">
        <tbody>
          <tr>
            <td className="table-input--pb vr">중식</td>
            <td>석식</td>
          </tr>
          <tr>
            <td className="hr resto--hr" />
          </tr>
          <tr>
            <td className="pw1 pt3 vr">
              <FormikField
                name="lunch"
                type="number"
                icon="money"
                styleName="textFieldC"
                variant="outlined"
                disabled={false}
              />
            </td>
            <td className="pw1">
              <FormikField
                name="dinner"
                type="number"
                icon="money"
                styleName="textFieldC"
                variant="outlined"
                disabled={false}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <FormButton
      typeValue="submit"
      variantValue="contained"
      buttonName="저장"
      width="extraBig"
      isSubmitting={isSubmitting}
    />
  </React.Fragment>
);

export default CateringForm;
