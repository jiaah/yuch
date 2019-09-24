import React from 'react';
/* --- Components --- */
import Icon from '../../assets/icons';

const IconMessage = ({
  name,
  width,
  height,
  viewBox,
  fillInner,
  fillOuter,
  text,
  classes,
  position,
}) => {
  const positioning = position === 'center' ? 'justify-center' : 'justify-end';
  return (
    <div className={`flex ${positioning}`}>
      <Icon
        name={name}
        width={width}
        height={height}
        viewBox={viewBox}
        fillOuter={fillOuter}
        fillInner={fillInner}
      />
      <div className={`ml2 ${classes}`}>{text}</div>
    </div>
  );
};

export default IconMessage;
