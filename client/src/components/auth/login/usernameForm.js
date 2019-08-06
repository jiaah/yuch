import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import FormButton from '../../../shared/form/formButton';
import RadioButtons from './radioButtons';

const UsernameForm = ({ isSubmitting }) => {
  const [selectedValue, setSelectedValue] = useState('contactNo');
  const handleSelectRadioButton = e => setSelectedValue(e.target.value);
  return (
    <div>
      <Paper className="">
        <table className="w-100">
          <tbody>
            <tr className="verify-user--bb">
              <td className="pw2 f-mini fw3">인증방법</td>
              <td className="pw1">
                <RadioButtons
                  selectedValue={selectedValue}
                  handleSelectRadioButton={handleSelectRadioButton}
                />
              </td>
            </tr>
            {selectedValue === 'email' && (
              <tr>
                <td className="pw2 f-mini fw3">이메일</td>
                <td>
                  <FormikField
                    label=""
                    name="email"
                    type="email"
                    icon="email"
                    styleName="textField"
                    variant="outlined"
                    placeholder="sleket12@hanmail.net"
                  />
                </td>
              </tr>
            )}
            {selectedValue === 'contactNo' && (
              <tr>
                <td className="pw2 f-mini fw3">연락처</td>
                <td>
                  <FormikField
                    label=""
                    name="contactNo"
                    type="contactNo"
                    icon="phone"
                    styleName="textField"
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
    </div>
  );
};

export default UsernameForm;
