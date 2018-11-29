import React from 'react';
/* --- Components --- */
import Loader from './src/shared/loader';
import './styles/main.scss';

const Nav = Loader({
  loader: () => import('./src/components/nav' /* webpackChunkName: 'Nav' */),
});

const App = props => {
  const isHomepage = props.history.location.pathname === '/';

  return (
    <div id="app">
      {props.children}
      {!isHomepage ? <Nav /> : null}
    </div>
  );
};

export default App;
