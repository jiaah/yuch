import React from 'react';

const ArrowRight = ({ name, width, height, viewBox, fillOuter }) => (
  <svg
    width={width}
    height={height}
    viewBox={viewBox}
    className={`svg-icon icon-${name} || ''`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path opacity=".87" fill="none" d="M24 24H0V0h24v24z" />
    <path
      fill={fillOuter}
      d="M6.49 20.13l1.77 1.77 9.9-9.9-9.9-9.9-1.77 1.77L14.62 12l-8.13 8.13z"
    />
  </svg>
);
export default ArrowRight;
