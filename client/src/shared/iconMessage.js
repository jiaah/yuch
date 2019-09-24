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
  iconBoxStyle,
  position,
  textStyle,
}) => {
  const positioning = position === 'center' ? 'justify-center' : 'justify-end';
  return (
    <div className={`flex ${positioning} ${iconBoxStyle}`}>
      <Icon
        name={name}
        width={width}
        height={height}
        viewBox={viewBox}
        fillOuter={fillOuter}
        fillInner={fillInner}
      />
      <div className={`ml2 ${textStyle}`}>{text}</div>
    </div>
  );
};

export default IconMessage;
