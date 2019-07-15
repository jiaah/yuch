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

window.onbeforeunload = () => {
  window.onunload = () => {
    clearLocalStorage();
  };
  return undefined;
};

const App = props => (
  <div id="app absolute">
    <NavContainer />
    {props.messageShow !== null &&
      !props.isOnModal && (
        <div className="flex justify-center">
          <MessageBox />
        </div>
      )}
    {props.children}
  </div>
);

const mapPropsToState = state => ({
  isOnModal: state.modal.show,
  messageShow: state.message.show,
});

export default connect(
  mapPropsToState,
  null,
)(App);
