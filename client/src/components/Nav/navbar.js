import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, userName, handleUserLogout }) => (
  <div className="nav-bar">
    <a
      className="contact mh-auto f-mini td-none white"
      href="tel:+82-54-745-0999"
    >
      상담전화&#8201;
      <span>&#8201;&#40;054&#41; 745&#8201;&#45;&#8201;0999</span>
    </a>
    {/* calling isLoggedIn() directly from localStoragy does not re-render the component on router history change. */}
    {isLoggedIn ? (
      <div className="flex">
        <p className="mr3 mt2">
          안녕하세요. <span className="b">{userName}</span>
          &#8201;님,
        </p>
        <button
          type="button"
          className="login-btn td-none c-text br f-mini"
          onClick={handleUserLogout}
        >
          로그아웃
        </button>
      </div>
    ) : (
      <Link className="login-btn td-none c-text br f-mini" to="/login">
        로그인
      </Link>
    )}
  </div>
);

export default Navbar;
