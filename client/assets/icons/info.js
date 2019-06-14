import React from 'react';

const Info = ({ name, width, height, viewBox, fillOuter, fillInner }) => (
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
        d="M11.1130618,13.75 L9.5119382,13.75 L9.5119382,8.69918699 L11.1130618,8.69918699 L11.1130618,13.75 Z M9.375,7.15447154 C9.375,6.65650407 9.79634831,6.25 10.3019663,6.25 C10.8286517,6.25 11.25,6.65650407 11.25,7.15447154 C11.25,7.65243902 10.8286517,8.05894309 10.3019663,8.05894309 C9.79634831,8.05894309 9.375,7.65243902 9.375,7.15447154 Z"
      />
    </g>
  </svg>
);
export default Info;
