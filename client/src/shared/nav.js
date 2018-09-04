import React from 'react';
/* --- shared --- */
import * as data from './data';
import Ul from './ul';

// Preload Nav Component on mouseover Login button when on Homepage
const Nav = () => (
  <div className="nav">
    <div className="flex justify-between nav--top">
      <p className="mh-auto f-mini fw3">
        상담전화
        <span className="f-regular"> xxx&#45;xxxx&#45;xxxx</span>
      </p>
      <Ul links={data.redirectToLogin} />
    </div>
    <h1>
      <Ul links={data.redirectToHome} />
    </h1>
    <div className="hr-center">
      <Ul links={data.nav} />
    </div>
  </div>
);

export default Nav;
