import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import { admin } from '../../data/data';
import { printDiv } from '../../utils/print';
import IconButton from '../../shared/form/iconButton';
/* --- images --- */
import logo from '../../../assets/img/yuch-logo.png';

const styles = () => ({
  textField: {
    width: 400,
    margin: '25px 14px',
  },
  textFieldA: {
    width: 120,
    // fontSize: '20px',
    marginTop: '-4px',
  },
});

const UserGuide = ({ classes: { textField, textFieldA } }) => {
  const [state, setState] = useState({
    companyName: '',
    username: '',
    password: '',
    email: '',
  });

  const handleChange = (e, name) =>
    setState({ ...state, [name]: e.target.value });

  return (
    <div id="print" className="container-a r--w-60">
      <div className="print-width  guide">
        <div className="flex justify-between pb5 mt3 ml3">
          <img className="guide--yuch-logo" src={logo} alt="logo" />
          <IconButton
            name="print"
            width="32"
            height="32"
            viewBox="0 0 25 25"
            handleClick={() => printDiv('print')}
          />
        </div>
        <div className="flex justify-center mt3">
          <TextField
            name="companyName"
            value={state.companyName || ''}
            onChange={e => handleChange(e, 'companyName')}
            className={textFieldA}
          />
          <p className="ml3 f-large">
            고객님, &#8199;
            <span className="b">환영합니다</span>.
          </p>
        </div>
        <p className="mt5 f-large lh-2">
          {admin.companyName}은 소중한 고객님께 더 나은 서비스를
          제공하고자&#8201;
          <span className="b c-blue">자동화된 시스템 </span>
          으로 <br />
          운영하게 되었습니다.
        </p>
        <p className="mt4 lh-3 f-large b">
          # {admin.companyName} 홈페이지에서{' '}
          <span className="b c-blue">식수량 신청 또는 변경</span>
          <br /># 식수량이 일정하신 고객님을 위한{' '}
          <span className="b c-blue">기본 식수량 설정 옵션</span>
          <br /># 발행된 거래명세서는 <span className="b c-blue">
            매월 1일
          </span>{' '}
          홈페이지에서 바로 확인
          <br /># 지난 거래명세서{' '}
          <span className="b c-blue">언제, 어디서든 열람</span>
        </p>
        <div className="flex flex-column-m items-center mt5">
          <TextField
            name="username"
            label="아이디"
            value={state.username || ''}
            onChange={e => handleChange(e, 'username')}
            className={textField}
          />
          <TextField
            name="password"
            label="비밀번호"
            value={state.password || ''}
            onChange={e => handleChange(e, 'password')}
            className={textField}
          />
          <TextField
            name="email"
            label="이메일"
            value={state.email || ''}
            onChange={e => handleChange(e, 'email')}
            className={textField}
          />
        </div>
        <p className="mt5 mb5 f-large b">
          - 유청 서비스를 이용해 주셔서 감사합니다 -
        </p>
      </div>
    </div>
  );
};

export default withStyles(styles)(UserGuide);
