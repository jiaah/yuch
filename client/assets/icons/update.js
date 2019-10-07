import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

const Update = ({ name, width, height, viewBox, fillOuter }) => (
  <Tooltip title="인보이스 업데이트" aria-label="update">
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
        d="M12 16.5l4-4h-3v-9h-2v9H8l4 4zm9-13h-6v1.99h6v14.03H3V5.49h6V3.5H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2z"
      />
      <circle cx="18" cy="11.5" r="1" />
    </svg>
  </Tooltip>
);
export default Update;
