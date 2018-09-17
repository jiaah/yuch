import React from 'react';
/* --- Components --- */
import Header from './header';
import HomeMain from './homeMain';
import ReserveContainer from '../reserve/reserveContainer';
import Board from './board';

const Home = () => [
  <Header key="1" />,
  <HomeMain key="2" />,
  <ReserveContainer key="3" />,
  <Board key="4" />,
];

export default Home;
