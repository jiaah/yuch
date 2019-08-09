import React from 'react';
import { withRouter } from 'react-router';
/* --- Components --- */
import Paper from '@material-ui/core/Paper';
import Button from '../../../shared/form/button';

const FoundUsernamePage = ({ data, selectedValue, history }) => {
  const { companyName, username, email, contactNo } = data;
  const label = selectedValue === 'email' ? '이메일' : '연락처';
  const info = selectedValue === 'email' ? email : contactNo;

  const redirectToLogin = () => history.push('/login');
  const redirectToForgotPassword = () =>
    history.push('/auth/forgot?value=password');

  return (
    <div className="tc">
      <h2 className="mb4">아이디 찾기가 완료되었습니다.</h2>
      <div className="flex flex-column-m items-center mh1">
        <Paper className="verify-user--paper">
          <table className="flex flex-column-m">
            <tbody>
              <tr>
                <td className="ph1 verify-user--label">이름</td>
                <td className="ph1 pw2 ts">
                  <span className="b">{companyName}</span>
                </td>
              </tr>
              <tr>
                <td className="pw3 pb3 f-mini fw3">{label}</td>
                <td className="pw2 ts">
                  <span className="b">{info}</span>
                </td>
              </tr>
              <tr>
                <td className="verify-user--hr" />
              </tr>
              <tr>
                <td className="ph1 verify-user--label">아이디</td>
                <td className="ph1 pw2 ts">
                  <span className="b c-point2">{username}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </Paper>
      </div>

      <div>
        <Button
          typeValue="button"
          variantValue="outlined"
          buttonName="로그인"
          width="big"
          handleButtonClick={redirectToLogin}
        />
        <Button
          typeValue="button"
          variantValue="contained"
          buttonName="비밀번호찾기"
          width="big"
          handleButtonClick={redirectToForgotPassword}
        />
      </div>
    </div>
  );
};

export default withRouter(FoundUsernamePage);
