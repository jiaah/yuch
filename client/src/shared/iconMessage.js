import React from 'react';
/* --- Components --- */
import Icon from '../../assets/icons';

const IconMessage = (
  name,
  width,
  height,
  viewBox,
  fillInner,
  fillOuter,
  text,
) => (
  <div className="flex justify-end">
    <Icon
      name={name}
      width={width}
      height={height}
      viewBox={viewBox}
      fillOuter={fillOuter}
      fillInner={fillInner}
    />
    <p style={{ marginTop: '-.91px' }}>{text}</p>
  </div>
);

export default IconMessage;
