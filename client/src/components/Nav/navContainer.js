import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

/* --- Components --- */
import * as data from '../../shared/data';
import Ul from '../../shared/ul';
import { clearLocalStorage } from '../../../localStorage';
import Navbar from './navbar';
/* --- images --- */
import logo from '../../../assets/img/yuch-logo.png';
/* --- actions --- */
import { userLogout } from '../../actions/authAction';

// Preload Nav Component on mouseover Login button when on Homepage
// Use State to keep track of routes.
class NavContainer extends Component {
  handleUserLogout = async ev => {
    ev.preventDefault();
    await this.props.userLogout();
    await clearLocalStorage();
    return this.props.history.push('/login');
  };

  render() {
    const isHomepage = this.props.history.location.pathname === '/';

    const addBorderBottom = isHomepage ? '' : 'bb';
    const { isLoggedIn, userName } = this.props;

    return (
      <div className="nav">
        <Navbar
          isLoggedIn={isLoggedIn}
          userName={userName}
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
