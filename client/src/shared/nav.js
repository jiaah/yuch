import React from 'react';
/* --- shared --- */
import * as data from './data';
import Hr from './hr';
import Ul from './ul';

// Preload Nav Component on mouseover Login button when on Homepage
const Nav = () => (
  <div className="nav">
    <div className="flex justify-between nav--top">
      <p className="mh-auto f-mini fw3">
        상담전화
        <span className="f-regular"> 010&#45;8034&#45;0057</span>
      </p>
      <Ul links={data.redirectToLogin} />
    </div>
    <h1>
      <Ul links={data.redirectToHome} />
    </h1>
    <Hr />
    <div>
      <Ul links={data.nav} />
    </div>
    <Hr />
  </div>
);

export default Nav;
