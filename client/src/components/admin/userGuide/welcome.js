import React from 'react';
import TextField from '@material-ui/core/TextField';

const Welcome = ({ handleChange, adminCompanyName, state, textField }) => {
  const { username, password, mealPrice, email } = state;
  return (
    <div className="f-mini">
      <p className="mt4">
        {adminCompanyName}은 소중한 고객님께 더 나은 서비스를 제공하고자&#8201;
        <br />
        <span className="b">자동화된 시스템 </span>
        으로 운영합니다.
      </p>
      <p className="mt3 lh-2">
        # {adminCompanyName} 홈페이지에서{' '}
        <span className="b c-blue">식수량 신청 또는 변경</span>
        <br /># 식수량이 일정하신 고객님을 위한{' '}
        <span className="b c-blue">기본 식수량 설정 옵션</span>
        <br /># 발행된 거래명세서는 <span className="b c-blue">
          매월 마지막 날
        </span>{' '}
        홈페이지에서 바로 확인
        <br /># 지난 거래명세서{' '}
        <span className="b c-blue">언제, 어디서든 열람</span>
      </p>
      <div className="flex flex-column-m items-center mh3">
        <div className="pb2 pt3 text-br">
          <TextField
            name="username"
            label="아이디"
            value={username || ''}
            onChange={e => handleChange(e, 'username')}
            className={textField}
          />
          <TextField
            name="password"
            label="비밀번호"
            value={password || ''}
            onChange={e => handleChange(e, 'password')}
            className={textField}
          />
          <TextField
            name="mealPrice"
            label="식수가격"
            value={mealPrice || ''}
            onChange={e => handleChange(e, 'mealPrice')}
            className={textField}
          />
          <TextField
            name="email"
            label="이메일"
            value={email || ''}
            onChange={e => handleChange(e, 'email')}
            className={textField}
          />
        </div>
      </div>
      <p className="mt2 underline">https://yu-chung.com/</p>
      <p className="mt1 mb3">
        <span className="b">&#39;구글 크롬&#39;</span> 웹 브라우저에서 &#39;
        <span className="b">유청 위탁급식</span>
        &#39;을 검색하세요.
      </p>
    </div>
  );
};
export default Welcome;
