import React from 'react';
import Paper from '@material-ui/core/Paper';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import FormButton from '../../../shared/form/formButton';
import RadioButtons from './radioButtons';

const UsernameForm = ({
  isSubmitting,
  selectedValue,
  handleSelectRadioButton,
}) => (
  <React.Fragment>
    <Paper className="verify-user--paper">
      <table>
        <tbody>
          <tr className="verify-user--bb">
            <td className="verify-user--label">인증방법</td>
            <td className="pw1">
              <RadioButtons
                selectedValue={selectedValue}
                handleSelectRadioButton={handleSelectRadioButton}
              />
            </td>
          </tr>
          <tr>
            <td className="verify-user--hr" />
          </tr>
          {selectedValue === 'email' && (
            <tr>
              <td className="verify-user--label">이메일</td>
              <td>
                <FormikField
                  label=""
                  name="email"
                  type="email"
                  icon="email"
                  styleName="textFieldA"
                  variant="outlined"
                  placeholder="sleket12@hanmail.net"
                />
              </td>
            </tr>
          )}
          {selectedValue === 'contactNo' && (
            <tr>
              <td className="verify-user--label">연락처</td>
              <td>
                <FormikField
                  label=""
                  name="contactNo"
                  type="text"
                  icon="phone"
                  styleName="textFieldA"
                  variant="outlined"
                  placeholder="054-745-0999"
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Paper>
    <FormButton
      typeValue="submit"
      variantValue="contained"
      buttonName="계속하기"
      className="login-btn"
      isSubmitting={isSubmitting}
    />
  </React.Fragment>
);

export default UsernameForm;
