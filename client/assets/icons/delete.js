import React from 'react';

const Delete = ({ name, width, height, viewBox, fillOuter, fillInner }) => (
  <svg
    width={width}
    height={height}
    viewBox={viewBox}
    className={`svg-icon icon-${name} || ''`}
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    id="Слой_1"
    x="0px"
    y="0px"
    enableBackground={`new ${viewBox}`}
    xmlSpace="preserve"
  >
    <g>
      <g>
        <path
          fill={fillInner}
          d="M44.6,115h38.8c2.1,0,3.9-1.7,4-3.8L90,62.9H38l2.6,48.3C40.7,113.3,42.4,115,44.6,115z"
        />
      </g>
      <g>
        <path
          fill={fillInner}
          d="M35.1,57.5L35.1,57.5c19-4.6,38.8-4.6,57.7,0l0,0v5.4H35.1V57.5z"
        />
      </g>
      <g>
        <path
          fill={fillOuter}
          d="M70,102.1c-1.7,0-3-1.3-3-3v-20c0-1.7,1.3-3,3-3s3,1.3,3,3v20C73,100.7,71.7,102.1,70,102.1z"
        />
      </g>
      <g>
        <path
          fill={fillOuter}
          d="M58,102.1c-1.7,0-3-1.3-3-3v-20c0-1.7,1.3-3,3-3s3,1.3,3,3v20C61,100.7,59.7,102.1,58,102.1z"
        />
      </g>
      <g>
        <path
          fill={fillOuter}
          d="M83.4,118H44.6c-3.7,0-6.8-2.9-7-6.6L35,63.1c0-0.8,0.3-1.6,0.8-2.2c0.6-0.6,1.4-0.9,2.2-0.9H90       c0.8,0,1.6,0.3,2.2,0.9c0.6,0.6,0.9,1.4,0.8,2.2l-2.6,48.3C90.2,115.1,87.1,118,83.4,118z M41.1,65.9l2.4,45.1c0,0.5,0.5,1,1,1       h38.8c0.5,0,1-0.4,1-1l2.4-45.1H41.1z"
        />
      </g>
      <g>
        <path
          fill={fillOuter}
          d="M92.9,65.9c-1.7,0-3-1.3-3-3v-3c-17-3.8-34.8-3.8-51.7,0v3c0,1.7-1.3,3-3,3s-3-1.3-3-3v-5.4       c0-1.4,0.9-2.6,2.3-2.9c19.4-4.7,39.8-4.7,59.2,0c1.3,0.3,2.3,1.5,2.3,2.9v5.4C95.9,64.6,94.5,65.9,92.9,65.9z"
        />
      </g>
    </g>
  </svg>
);
export default Delete;
