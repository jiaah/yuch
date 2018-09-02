import React from 'react';
/* --- Shared --- */
import Nav from '../shared/nav';

const Home = () => (
  <header className="cover background">
    <Nav />
    <div className="header-text--box">
      <h2>
        <span className="f-large">NO MSG!</span>
        <br />
        힘들게 일한 당신께 착한 가격의 집밥을 선물하세요.
      </h2>
    </div>
  </header>
);

export default Home;
