import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

const ShowChart = ({ name, width, height, viewBox, fillOuter }) => (
  <Tooltip title="그래프" aria-label="showChart">
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
        d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"
      />
    </svg>
  </Tooltip>
);
export default ShowChart;
