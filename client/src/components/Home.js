import React from 'react';
/* --- Components --- */
import HomeMain from './Home.main';
/* --- Shared --- */
import Nav from '../shared/nav';

const Home = () => (
  <div>
    <header>
      <Nav />
      <div className="header-text--box">
        <h2>
          <span className="f-regular f-en lh-3">NO MSG!</span>
          <br />
          오늘도 열심히 일하는 당신에게 착한 가격의 집밥을 선물하세요.
        </h2>
      </div>
    </header>
    <HomeMain />
  </div>
);

export default Home;
