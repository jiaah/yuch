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
  let positioning;
  if (position === 'start') positioning = 'justify-start';
  if (position === 'center') positioning = 'justify-center';
  if (position === 'end') positioning = 'justify-end';

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
