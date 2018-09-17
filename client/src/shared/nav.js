import React from 'react';
import { withRouter } from 'react-router';
/* --- Components --- */
import * as data from './data';
import Ul from './ul';

// Preload Nav Component on mouseover Login button when on Homepage
// Use State to keep track of routes.
const Nav = props => {
  const isHomepage = props.history.location.pathname === '/';
  return (
    <div className="nav">
      <div className="flex justify-between nav--top">
        <a
          className="contact mh-auto f-mini fw3 td-none c-text"
          href="tel:+81-54-745-0999"
        >
          상담전화
          <span className="f-regular">
            &#8201;&#40;054&#41; 745&#8201;&#45;&#8201;0999
          </span>
        </a>
        <Ul links={data.redirectToLogin} />
      </div>
      <h1>
        <Ul links={data.redirectToHome} />
      </h1>
      <div className="bt">{isHomepage && <Ul anchor={data.nav} />}</div>
    </div>
  );
};

export default withRouter(Nav);
