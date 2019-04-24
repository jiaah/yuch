import React from 'react';
/* --- Components --- */
import Icon from '../../assets/icons';

const IconButton = ({ handleClick, name, width, height, viewBox, fill }) => (
  <button
    type="button"
    style={{ border: 'none', backgroundColor: 'transparent' }}
    onClick={handleClick}
  >
    <Icon
      name={name}
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fill}
    />
  </button>
);

export default IconButton;
