import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { admin } from '../../data/data';
import { printDiv } from '../../utils/print';
import IconButton from '../../shared/form/iconButton';

const styles = () => ({
  textField: {
    width: 400,
    margin: '20px 14px',
  },
  textFieldA: {
    width: 120,
    // fontSize: '20px',
    marginTop: '-2px',
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
    <div id="print" className="container-a r--w-40 pt5">
      <div className="float-right">
        <IconButton
          name="print"
          width="32"
          height="32"
          viewBox="0 0 25 25"
          handleClick={() => printDiv('print')}
        />
      </div>
      <div className="print-width">
        <div className="flex justify-center">
          <TextField
            name="companyName"
            value={state.companyName || ''}
            onChange={e => handleChange(e, 'companyName')}
            className={textFieldA}
          />
          <h3 className="ml3">고객님, 환영합니다.</h3>{' '}
        </div>
        <p className="mt4">
          {admin.companyName}은 고객님께 더 나은 서비스를 제공하고자{' '}
          <span className="b">시스템을 자동화</span> 하였습니다.
        </p>
        <p className="mt3 lh-2">
          # {admin.companyName} 홈페이지에서 식수량 신청 또는 변경.
          <br /># 발행된 거래명세서는 <span className="b">매월 1일</span>{' '}
          홈페이지를 통해서 바로 확인.
          <br /># 지난 거래명세서를 언제든 열람 가능.
        </p>
        <div className="flex flex-column-m items-center mt4">
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
        <h3 className="mt5">- 유청 서비스를 이용해 주셔서 감사합니다 -</h3>
      </div>
    </div>
  );
};

export default withStyles(styles)(UserGuide);
