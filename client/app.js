import React from 'react';
/* --- Components --- */
import Nav from './src/components/nav';
import FlashMessagesList from './src/shared/flassMessagesList';
import './styles/main.scss';

const App = props => (
  <div id="app">
    <Nav />
    <FlashMessagesList />
    {props.children}
  </div>
);

export default App;
