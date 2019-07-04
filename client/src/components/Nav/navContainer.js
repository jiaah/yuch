import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
/* --- Components --- */
import { clearLocalStorage } from '../../../localStorage';
import Navbar from './navbar';
import NavMenu from './navMenu';
import * as data from '../../data/data';
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
    const { isLoggedIn, companyName, isAdmin, routerLocation } = this.props;

    return (
      <div className="nav relative">
        <Navbar
          isLoggedIn={isLoggedIn}
          handleUserLogout={this.handleUserLogout}
        />
        <div className="tc">
          <Link className="td-none" to="/">
            <img className="yuch-logo" src={logo} alt="logo" />
          </Link>
        </div>
        {isLoggedIn &&
          !isAdmin && (
            <p className="mr3 pb2 flex justify-end f-mini">
              안녕하세요. &#8201;
              <span className="b">{companyName}</span>
              &#8201;님,
            </p>
          )}
        <NavMenu
          routerLocation={routerLocation}
          isLoggedIn={isLoggedIn}
          companyName={companyName}
          data={data}
          isAdmin={isAdmin}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  companyName: state.auth.companyName,
  isAdmin: state.auth.isAdmin,
  routerLocation: state.router.location.pathname,
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
