import React from 'react';
import Paper from '@material-ui/core/Paper';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import FormButton from '../../../shared/form/formButton';

const PasswordForm = ({ isSubmitting }) => (
  <React.Fragment>
    <Paper className="verify-user--paper">
      <table>
        <tbody>
          <tr>
            <td className="verify-user--label">아이디</td>
            <td>
              <FormikField
                label=""
                name="username"
                type="text"
                icon="filledUser"
                styleName="textFieldA"
                variant="outlined"
                placeholder="yucheong"
                required
              />
            </td>
          </tr>
          <tr>
            <td className="verify-user--hr" />
          </tr>
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
                required
              />
            </td>
          </tr>
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

export default PasswordForm;
