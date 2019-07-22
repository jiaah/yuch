import React, { useState } from 'react';
/* --- Components --- */
import Icon from '../../../assets/icons';

const IconButton = ({ handleClick, name, width, height, viewBox }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const outerColor = isHovered ? '#ed6802' : '#E8716F';

  return (
    <button
      type="button"
      style={{
        border: 'none',
        backgroundColor: 'transparent',
        paddingTop: '0',
        paddingBottom: '0',
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon
        name={name}
        width={width}
        height={height}
        viewBox={viewBox}
        fillInner="#ffffff"
        fillOuter={outerColor}
      />
    </button>
  );
};

export default IconButton;
