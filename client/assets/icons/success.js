import React from 'react';

const Success = ({ name, width, height, viewBox, fillOuter, fillInner }) => (
  <svg
    width={width}
    height={height}
    viewBox={viewBox}
    className={`svg-icon icon-${name} || ''`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <circle cx="10" cy="10" r="10" fill={fillOuter} />
      <polyline
        stroke={fillInner}
        strokeLinecap="round"
        strokeWidth="2"
        points="6.875 9.913 8.962 12 12.837 8.125"
      />
    </g>
  </svg>
);
export default Success;
