import React from 'react';
/* --- Components --- */
import Header from './header';
import HomeMain from './homeMain';
import ReserveContainer from '../reserve/reserveContainer';
import Board from './board';

const Home = () => (
  <div>
    <Header />
    <HomeMain />
    <ReserveContainer />
    <Board />
  </div>
);

export default Home;
