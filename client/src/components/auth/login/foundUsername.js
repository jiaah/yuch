import React from 'react';
import { withRouter } from 'react-router';
/* --- Components --- */
import Paper from '../../../shared/paper';
import Button from '../../../shared/form/button';

const FoundUsername = ({ data, history }) => {
  const redirectToLogin = () => history.push('/login');
  const redirectToForgotPassword = () =>
    history.push('/auth/forgot?value=password');
  return (
    <div>
      <h2 className="">고객님의 아이디를 찾았습니다.</h2>
      <Paper
        classes="mt5 mb3"
        component={
          <table className="flex flex-column-m ph1">
            <tbody>
              <tr>
                <td className="pa3">이메일</td>
                <td className="pw2">
                  <span className="b">{data.email}</span>
                </td>
              </tr>
              <tr>
                <td className="pa3">아이디</td>
                <td className="ts pw2">
                  <span className="b c-point2">{data.username}</span>
                </td>
              </tr>
            </tbody>
          </table>
        }
      />
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

export default withRouter(FoundUsername);
