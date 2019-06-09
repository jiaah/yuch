import React from 'react';

/* --- SVG Icon Components --- */
import Close from './close';
import FilledUser from './filledUser';
import FilledLock from './filledLock';
import User from './user';
import Lock from './lock';
import Phone from './phone';
import Email from './email';
import Catering from './catering';
import BankAccount from './bankAccount';
import Error from './error';
import Info from './info';
import Success from './success';
import Warning from './warning';
import Edit from './edit';
import Add from './add';

const Icon = props => {
  switch (props.name) {
    case 'close':
      return <Close {...props} />;
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
    case 'email':
      return <Email {...props} />;
    case 'catering':
      return <Catering {...props} />;
    case 'bankAccount':
      return <BankAccount {...props} />;
    case 'error':
      return <Error {...props} />;
    case 'info':
      return <Info {...props} />;
    case 'success':
      return <Success {...props} />;
    case 'warning':
      return <Warning {...props} />;
    case 'edit':
      return <Edit {...props} />;
    case 'add':
      return <Add {...props} />;
    default:
      return <div />;
  }
};

export default Icon;
