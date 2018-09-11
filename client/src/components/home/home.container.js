import React from 'react';
/* --- Components --- */
import Header from './home.header';
import HomeMain from './home.main';
import ReserveWrapped from '../reserve/reserve.container';

const Home = () => (
  <div>
    <Header />
    <HomeMain />
    <ReserveWrapped />
  </div>
);

export default Home;
