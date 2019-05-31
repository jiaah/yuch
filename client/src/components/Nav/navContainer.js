import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
/* --- Components --- */
import * as data from '../../shared/data';
import Ul from '../../shared/ul';
import { clearLocalStorage } from '../../../localStorage';
import Navbar from './navbar';
/* --- actions --- */
import { userLogout } from '../../actions/authAction';
/* --- images --- */
import logo from '../../../assets/img/yuch-logo.png';

class NavContainer extends Component {
  handleUserLogout = async ev => {
    ev.preventDefault();
    await this.props.userLogout();
    await clearLocalStorage();
    return this.props.history.push('/');
  };

  render() {
    const { isLoggedIn, userName, history } = this.props;
    const isHomepage = history.location.pathname === '/';
    const addBorderBottom = isHomepage ? '' : 'bb';

    return (
      <div className="nav">
        <Navbar
          isLoggedIn={isLoggedIn}
          handleUserLogout={this.handleUserLogout}
        />
        <div className="tc">
          <Link className="td-none" to="/">
            <img className="yuch-logo" src={logo} alt="logo" />
          </Link>
        </div>
        {isLoggedIn && (
          <p className="mr3 pb2 flex justify-end">
            안녕하세요. &#8201;
            <span className="b">{userName}</span>
            &#8201;님,
          </p>
        )}
        <div className={`bt ${addBorderBottom}`}>
          <Ul anchor={data.nav} />
        </div>
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
  )(NavContainer),
);
