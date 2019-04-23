import React from 'react';
/* --- Components --- */
import Nav from './src/components/nav';
import FlashMessagesContainer from './src/shared/flassMessagesContainer';
import './styles/main.scss';

const App = props => (
  <div id="app">
    <Nav />
    <FlashMessagesContainer />
    {props.children}
  </div>
);

export default App;
