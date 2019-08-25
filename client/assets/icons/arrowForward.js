import React from 'react';

const ArrowForward = ({ name, width, height, viewBox, fillOuter }) => (
  <svg
    width={width}
    height={height}
    viewBox={viewBox}
    className={`svg-icon icon-${name} || ''`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path opacity=".87" fill="none" d="M0 0h24v24H0V0z" />
    <path fill={fillOuter} d="M10 17l5-5-5-5v10z" />
  </svg>
);
export default ArrowForward;
