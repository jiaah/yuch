import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import NavContainer from './src/components/nav/navContainer';
import Loader from './src/shared/loader';
import { clearLocalStorage } from './localStorage';
import './styles/main.scss';

const MessageBox = Loader({
  loader: () =>
    import('./src/shared/message/messageBox' /* webpackChunkName: 'MessageBox' */),
});

const App = ({ messageShow, isOnModal, keepLoggedIn, children }) => {
  // keep me logged in when window/tab closed
  window.onbeforeunload = () => {
    window.onunload = () => {
      if (!keepLoggedIn) return clearLocalStorage();
    };
    return undefined;
  };

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
  null,
)(App);
