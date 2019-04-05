import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

/* --- Components --- */
import * as data from '../shared/data';
import Ul from '../shared/ul';
import { isLoggedIn, deleteToken } from '../../localStorage';
/* --- Actions --- */
import logo from '../../assets/img/yuch-logo.png';

// Preload Nav Component on mouseover Login button when on Homepage
// Use State to keep track of routes.
class Nav extends Component {
  constructor() {
    super();
    this.handleUserLogout = this.handleUserLogout.bind(this);
  }

  handleUserLogout = async ev => {
    ev.preventDefault();
    await deleteToken();
    return this.props.history.push('/login');
  };

  render() {
    const isHomepage = this.props.history.location.pathname === '/';
    return (
      <div className="nav">
        <div className="flex justify-between nav--top">
          <a
            className="contact mh-auto f-mini td-none white"
            href="tel:+82-54-745-0999"
          >
            상담전화&#8201;
            <span>&#8201;&#40;054&#41; 745&#8201;&#45;&#8201;0999</span>
          </a>
          {isLoggedIn() ? (
            <button
              type="button"
              className="login-btn td-none c-text br f-mini"
              onClick={this.handleUserLogout}
            >
              로그아웃
            </button>
          ) : (
            <Link className="login-btn td-none c-text br f-mini" to="/login">
              로그인
            </Link>
          )}
        </div>
        <h1 className="tc">
          <Link className="td-none" to="/">
            <img src={logo} alt="logo" />
          </Link>
        </h1>
        <div className="bt">{isHomepage && <Ul anchor={data.nav} />}</div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({});

export default withRouter(
  connect(
    undefined,
    mapDispatchToProps,
  )(Nav),
);
