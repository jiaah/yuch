import React from 'react';
/* --- Shared --- */
import Nav from '../shared/nav';
/* --- Components --- */
import HomeMain from './home.main';
import Reserve from './home.reserve';

const Home = () => (
  <div>
    <header>
      <Nav />
      <div className="header-text--box">
        <h2>
          <span className="f-regular f-en lh-3">NO MSG&#33;</span>
          <br />
          오늘도 열심히 일하는 당신에게 착한 가격의 집밥을 선물하세요&#46;
        </h2>
      </div>
    </header>
    <HomeMain />
    <Reserve />
  </div>
);

export default Home;
