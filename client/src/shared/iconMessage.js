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
}) => (
  <React.Fragment>
    <Icon
      name={name}
      width={width}
      height={height}
      viewBox={viewBox}
      fillOuter={fillOuter}
      fillInner={fillInner}
    />
    <p className={`ml2 ${classes}`}>{text}</p>
  </React.Fragment>
);

export default IconMessage;
