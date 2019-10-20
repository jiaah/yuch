import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

const List = ({ name, width, height, viewBox, fillOuter }) => (
  <Tooltip title="모든 고객 매출보기" aria-label="return to List">
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
        d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"
      />
    </svg>
  </Tooltip>
);
export default List;
