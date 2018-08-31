import React from 'react';
import Svg from '../../assets/svg/react.svg';

const Spinner = () => {
  console.log('Spinner Component is loaded!'); // eslint-disable-line
  return <img src={Svg} alt="loading indicator" />;
};

export default Spinner;
