import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import NavContainer from './src/components/nav/navContainer';
import Loader from './src/shared/loader';
import './styles/main.scss';

const MessageBox = Loader({
  loader: () =>
    import('./src/shared/message/messageBox' /* webpackChunkName: 'MessageBox' */),
});

const App = ({ messageShow, isOnModal, children }) => (
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

const mapPropsToState = state => ({
  isOnModal: state.modal.show,
  messageShow: state.message.show,
});

export default connect(
  mapPropsToState,
  null,
)(App);
