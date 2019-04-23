import React from 'react';

const Error = ({ name, width, height, viewBox, fill }) => (
  <svg
    width={width}
    height={height}
    viewBox={viewBox}
    className={`svg-icon icon-${name} || ''`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <circle cx="10" cy="10" r="10" fill="#FFF" />
      <polyline
        stroke={fill}
        strokeLinecap="round"
        strokeWidth="2"
        points="6.875 9.913 8.962 12 12.837 8.125"
      />
    </g>
  </svg>
);
export default Error;
