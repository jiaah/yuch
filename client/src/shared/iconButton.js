import React from 'react';
/* --- Components --- */
import Icon from '../../assets/icons';

const IconButton = ({
  handleClick,
  name,
  width,
  height,
  viewBox,
  fillInner,
  fillOuter,
}) => (
  <button
    type="button"
    style={{
      border: 'none',
      backgroundColor: 'transparent',
      paddingTop: '0',
      paddingBottom: '0',
    }}
    onClick={handleClick}
  >
    <Icon
      name={name}
      width={width}
      height={height}
      viewBox={viewBox}
      fillInner={fillInner}
      fillOuter={fillOuter}
    />
  </button>
);

export default IconButton;
