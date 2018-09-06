import React from 'react';
import { Helmet } from 'react-helmet';
/* --- Components --- */
import Loader from './src/utils/loader';

require('./styles/main.scss');

const Nav = Loader({
  loader: () => import('./src/shared/nav' /* webpackChunkName: 'Nav' */),
});

const App = props => {
  const isHomepage = props.history.location.pathname === '/';

  return (
    <div id="app">
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>###</title>
        <meta property="og:title" content="###" />
        <meta property="og:description" content="###" />
        <meta property="og:type" content="###" />
        <meta property="og:url" content="###" />
        <meta property="og:image" content="###" />
        <link type="text/plain" rel="author" href="http://domain/humans.txt" />
        <link type="text/plain" rel="author" href="http://domain/robots.txt" />
        <link
          href="https://fonts.googleapis.com/css?family=Nanum+Gothic"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />
      </Helmet>
      {props.children}
      {!isHomepage ? <Nav /> : null}
    </div>
  );
};

export default App;
