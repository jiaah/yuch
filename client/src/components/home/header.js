import React from 'react';
/* --- Components --- */
import Nav from '../nav';

const Header = () => (
  <header>
    <Nav />
    <div className="header-text--box">
      <h2>
        <span className="point1 f-en lh-3">NO MSG&#33;</span>
        <br />
        오늘도 열심히 일한 당신에게 <br />
        당신만을 위한 <span className="point2">착한 가격의 집밥을</span>
        선물하세요&#46;
      </h2>
    </div>
  </header>
);

export default Header;
