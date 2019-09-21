import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
/* --- Components --- */
import Navbar from './navbar';
import NavMenu from './navMenu';
import * as data from '../../data/data';
/* --- actions --- */
import { userLogout } from '../../actions/authAction';
/* --- images --- */
import logo from '../../../assets/img/yuch-logo.png';

const NavContainer = ({
  isLoggedIn,
  companyName,
  isAdmin,
  id,
  routerLocation,
  userLogout,
  history,
}) => {
  const handleUserLogout = async () => {
    await userLogout(id);
    return history.push('/');
  };

  return (
    <div className="nav relative">
      <Navbar isLoggedIn={isLoggedIn} handleUserLogout={handleUserLogout} />
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
};

const mapStateToProps = state => ({
  // calling 'isLoggedIn' directly from localStorage won't re-render Nav component.
  isLoggedIn: state.auth.isLoggedIn,
  companyName: state.auth.companyName,
  isAdmin: state.auth.isAdmin,
  id: state.auth.id,
  routerLocation: state.router.location.pathname,
});

const mapDispatchToProps = dispatch => ({
  userLogout: id => dispatch(userLogout(id)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(NavContainer),
);
