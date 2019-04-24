import React from 'react';
/* --- Components --- */
import Nav from './src/components/nav';
import Loader from './src/shared/loader';
import './styles/main.scss';

const FlashMessagesContainer = Loader({
  loader: () =>
    import('./src/shared/flassMessagesContainer' /* webpackChunkName: 'FlashMessagesContainer' */),
});

const App = props => {
  const { pathname } = props.history.location;
  let isOnModal = false;
  if (pathname === '/users/account') {
    isOnModal = true;
  }

  return (
    <div id="app">
      <Nav />
      {!isOnModal && (
        <div className="flex justify-center">
          <FlashMessagesContainer />
        </div>
      )}
      {props.children}
    </div>
  );
};

export default App;
