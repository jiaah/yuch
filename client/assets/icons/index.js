import React from 'react';

/* --- SVG Icon Components --- */
import Clear from './clear';
import FilledUser from './filledUser';
import FilledLock from './filledLock';
import User from './user';
import Lock from './lock';
import Phone from './phone';
import KorCurrency from './korCurrency';
import Email from './email';
import Catering from './catering';
import BankAccount from './bankAccount';

const Icon = props => {
  switch (props.name) {
    case 'clear':
      return <Clear {...props} />;
    case 'filledUser':
      return <FilledUser {...props} />;
    case 'filledLock':
      return <FilledLock {...props} />;
    case 'user':
      return <User {...props} />;
    case 'lock':
      return <Lock {...props} />;
    case 'phone':
      return <Phone {...props} />;
    case 'korCurrency':
      return <KorCurrency {...props} />;
    case 'email':
      return <Email {...props} />;
    case 'catering':
      return <Catering {...props} />;
    case 'bankAccount':
      return <BankAccount {...props} />;
    default:
      return <div />;
  }
};

export default Icon;
