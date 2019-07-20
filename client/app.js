import React, { useEffect } from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import NavContainer from './src/components/nav/navContainer';
import Loader from './src/shared/loader';
import './styles/main.scss';
import { userLogout } from './src/actions/authAction';
import { clearLocalStorage } from './localStorage';

const MessageBox = Loader({
  loader: () =>
    import('./src/shared/message/messageBox' /* webpackChunkName: 'MessageBox' */),
});

const App = ({
  messageShow,
  isOnModal,
  keepLoggedIn,
  userLogout,
  children,
  history,
}) => {
  useEffect(() => {
    if (!keepLoggedIn && !sessionStorage.getItem('keepLoggedIn')) {
      userLogout();
      clearLocalStorage();
      return history.push('/login');
    }
  }, []);
  return (
    <div id="app absolute">
      <NavContainer />
      {messageShow !== null &&
        !isOnModal && (
          <div className="flex justify-center">
            <MessageBox />
          </div>
        )}
      {children}
    </div>
  );
};
const mapPropsToState = state => ({
  isOnModal: state.modal.show,
  messageShow: state.message.show,
  keepLoggedIn: state.auth.keepLoggedIn,
});

export default connect(
  mapPropsToState,
  { userLogout },
)(App);
