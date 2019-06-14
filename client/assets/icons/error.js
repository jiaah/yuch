import React from 'react';

const Error = ({ name, width, height, viewBox, fillOuter, fillInner }) => (
  <svg
    width={width}
    height={height}
    viewBox={viewBox}
    className={`svg-icon icon-${name} || ''`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <circle cx="10" cy="10" r="10" fill={fillOuter} />
      <path
        fill={fillInner}
        d="M10.8539326,14.2857143 L9.14606742,14.2857143 L9.14606742,9.15472964 L10.8539326,9.15472964 L10.8539326,14.2857143 Z M9,7.5854949 C9,7.07962318 9.4494382,6.66666667 9.98876404,6.66666667 C10.5505618,6.66666667 11,7.07962318 11,7.5854949 C11,8.09136663 10.5505618,8.50432314 9.98876404,8.50432314 C9.4494382,8.50432314 9,8.09136663 9,7.5854949 Z"
        transform="rotate(180 10 10.476)"
      />
    </g>
  </svg>
);
export default Error;
