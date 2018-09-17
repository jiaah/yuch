import React from 'react';
/* --- Components --- */
import * as data from './data';
import Ul from './ul';

// Preload Nav Component on mouseover Login button when on Homepage
// Use State to keep track of routes.
const Nav = () => (
  <div className="nav">
    <div className="flex justify-between nav--top">
      <p className="contact mh-auto f-mini fw3">
        상담전화
        <span className="f-regular"> 054&#45;745&#45;0999</span>
      </p>
      <Ul links={data.redirectToLogin} />
    </div>
    <h1>
      <Ul links={data.redirectToHome} />
    </h1>
    <div className="bt">
      <Ul anchor={data.nav} />
    </div>
  </div>
);

export default Nav;
