import React from 'react';
/* --- Shared --- */
import Nav from '../shared/nav';
import HomeMain from './Home.main';

const Home = () => (
  <div>
    <div className="header--container">
      <div className="header-img">
        <h2 className="header-text--box">
          <span className="f-regular f-en lh-3">NO MSG!</span>
          <br />
          오늘도 열심히 일하는 당신에게 착한 가격의 집밥을 선물하세요.
        </h2>
      </div>
    </div>
    <HomeMain />
  </div>
);

export default Home;
