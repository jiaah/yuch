import React from 'react';

const ArrowLeft = ({ name, width, height, viewBox, fillOuter }) => (
  <svg
    width={width}
    height={height}
    viewBox={viewBox}
    className={`svg-icon icon-${name} || ''`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path opacity=".87" fill="none" d="M0 0h24v24H0V0z" />
    <path
      fill={fillOuter}
      d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z"
    />
  </svg>
);
export default ArrowLeft;
