import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

/* --- Components --- */
import * as data from '../../shared/data';
import Ul from '../../shared/ul';
import { clearLocalStorage } from '../../../localStorage';
/* --- images --- */
import logo from '../../../assets/img/yuch-logo.png';
/* --- actions --- */
import { userLogout } from '../../actions/authAction';

// Preload Nav Component on mouseover Login button when on Homepage
// Use State to keep track of routes.
class Nav extends Component {
  handleUserLogout = async ev => {
    ev.preventDefault();
    await this.props.userLogout();
    await clearLocalStorage();
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
          {/* calling isLoggedIn() directly from localStoragy does not re-render the component on router history change. */}
          {this.props.isLoggedIn ? (
            <div className="flex">
              <p className="mr3 mt2">
                안녕하세요. <span className="b">{this.props.userName}</span>
                &#8201;님,
              </p>
              <button
                type="button"
                className="login-btn td-none c-text br f-mini"
                onClick={this.handleUserLogout}
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
        <div className="tc">
          <Link className="td-none" to="/">
            <img className="yuch-logo" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="bt">{isHomepage && <Ul anchor={data.nav} />}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  userName: state.auth.userName,
});

const mapDispatchToProps = dispatch => ({
  userLogout: () => dispatch(userLogout()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Nav),
);
