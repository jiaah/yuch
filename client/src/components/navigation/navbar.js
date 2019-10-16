import React from 'react';
import { Link } from 'react-router-dom';
import { admin } from '../../data/data';

const Navbar = ({ isLoggedIn, handleUserLogout }) => (
  <div className="flex justify-between">
    <a
      className="contact mh-auto f-mini td-none white"
      href={`tel:${admin.contactNo1Link}`}
    >
      상담전화&#8199;
      {admin.contactNo1}
      <span />
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
