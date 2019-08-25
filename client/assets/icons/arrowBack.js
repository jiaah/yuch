import React from 'react';

const ArrowBack = ({ name, width, height, viewBox, fillOuter }) => (
  <svg
    width={width}
    height={height}
    viewBox={viewBox}
    className={`svg-icon icon-${name} || ''`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path opacity=".87" fill="none" d="M0 0h24v24H0V0z" />
    <path fill={fillOuter} d="M14 7l-5 5 5 5V7z" />
  </svg>
);
export default ArrowBack;
