import React from 'react';
/* --- Components --- */
import Header from './Header';
import HomeMain from './homeMain';
import ReserveContainer from '../reserve/reserveContainer';

const Home = () => (
  <div>
    <Header />
    <HomeMain />
    <ReserveContainer />
  </div>
);

export default Home;
