import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleUserLogout }) => (
  <div className="flex justify-between">
    <a
      className="contact mh-auto f-mini td-none white"
      href="tel:+82-54-745-0999"
    >
      상담전화&#8201;
      <span>&#8201;&#40;054&#41; 745&#8201;&#45;&#8201;0999</span>
    </a>
    {/* calling isLoggedIn() directly from localStoragy does not re-render the component on router history change. */}
    {isLoggedIn ? (
      <button
        type="button"
        className="nav--login-btn td-none c-text br f-mini"
        onClick={handleUserLogout}
      >
        로그아웃
      </button>
    ) : (
      <Link className="nav--login-btn td-none c-text br f-mini" to="/login">
        로그인
      </Link>
    )}
  </div>
);

export default Navbar;
