import React from 'react';

/* --- SVG Icon Components --- */
import Clear from './clear';
import User from './user';
import Lock from './lock';

const Icon = props => {
  switch (props.name) {
    case 'clear':
      return <Clear {...props} />;
    case 'user':
      return <User {...props} />;
    case 'lock':
      return <Lock {...props} />;
    default:
      return <div />;
  }
};

export default Icon;
