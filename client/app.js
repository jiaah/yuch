import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import NavContainer from './src/components/nav/navContainer';
import Loader from './src/components/loader';
import './styles/main.scss';

const MessageBox = Loader({
  loader: () =>
    import('./src/shared/message/messageContainer' /* webpackChunkName: 'MessageBox' */),
});

export const App = ({ messageShow, children }) => (
  <div id="app absolute">
    <NavContainer />
    {messageShow !== null && (
      <div className="flex justify-center">
        <MessageBox />
      </div>
    )}
    {children}
  </div>
);

const mapPropsToState = state => ({
  messageShow: state.message.show,
});

export default connect(
  mapPropsToState,
  null,
)(App);
