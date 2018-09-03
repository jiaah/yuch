import React from 'react';
/* --- shared --- */
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import * as data from './data';
import Hr from './hr';
import Ul from './ul';

const Nav = () => (
  <div className="nav">
    <div className="flex justify-between nav--top">
      <p className="mh-auto f-mini fw3 c-point1">
        상담전화
        <span className="f-regular"> 010&#45;8034&#45;0057</span>
      </p>
      <Ul links={data.redirectToLogin} />
    </div>
    <h2 className="tc c-point2 f-en">
      <Ul links={data.redirectToHome} />
    </h2>
    <Hr />
    <div>
      <Ul links={data.nav} />
    </div>
    <Hr />
  </div>
);

export default Nav;
