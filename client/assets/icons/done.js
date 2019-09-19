import React from 'react';

const Done = ({ name, width, height, viewBox, fillOuter }) => (
  <svg
    width={width}
    height={height}
    viewBox={viewBox}
    className={`svg-icon icon-${name} || ''`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path
      fill={fillOuter}
      d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
    />
  </svg>
);
export default Done;
