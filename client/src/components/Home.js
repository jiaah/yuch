import React from 'react';
/* --- Shared --- */
import Nav from '../shared/nav';
import HomeMain from './Home.main';

const Home = () => (
  <div className="header--container">
    <header>
      <Nav />
      <div className="header-text--box">
        <h1>
          <span className="f-regular f-en lh-3">NO MSG!</span>
          <br />
          힘들게 일한 당신께 착한 가격의 집밥을 선물하세요.
        </h1>
      </div>
    </header>
    <HomeMain />
  </div>
);

export default Home;
