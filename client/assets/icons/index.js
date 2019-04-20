import React from 'react';

/* --- SVG Icon Components --- */
import Clear from './clear';

const Icon = props => {
  switch (props.name) {
    case 'clear':
      return <Clear {...props} />;
    default:
      return <div />;
  }
};

export default Icon;
