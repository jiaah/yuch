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
    <div className={`ml2 ${classes}`}>{text}</div>
  </React.Fragment>
);

export default IconMessage;
