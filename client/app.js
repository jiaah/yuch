import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import NavContainer from './src/components/nav/navContainer';
import Loader from './src/shared/loader';
import './styles/main.scss';

const FlashMessageBox = Loader({
  loader: () =>
    import('./src/shared/flashMessageBox' /* webpackChunkName: 'FlashMessageBox' */),
});

const App = (props, { isOnModal }) => (
  <div id="app">
    <NavContainer />
    {!isOnModal && (
      <div className="flex justify-center">
        <FlashMessageBox />
      </div>
    )}
    {props.children}
  </div>
);

const mapPropsToState = state => ({
  isOnModal: state.modal.show,
});

export default connect(
  mapPropsToState,
  null,
)(App);
