import React from 'react';
/* --- Components --- */
import Header from './home.header';
import HomeMain from './home.main';
import Reserve from '../reserve/reserve.container';

const Home = () => (
  <div>
    <Header />
    <HomeMain />
    <Reserve />
  </div>
);

export default Home;
