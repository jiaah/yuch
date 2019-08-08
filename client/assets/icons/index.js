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
import Bank from './bank';
import BankAccount from './bankAccount';
import Error from './error';
import Info from './info';
import Success from './success';
import Warning from './warning';
import Edit from './edit';
import Add from './add';
import Delete from './delete';
import PersonAdd from './personAdd';
import Search from './search';
import Print from './print';
import Visibility from './visibility';
import VisibilityOff from './visibilityOff';
import Address from './address';
import ArrowRight from './arrowRight';
import ArrowLeft from './arrowLeft';

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
    case 'bank':
      return <Bank {...props} />;
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
    case 'personAdd':
      return <PersonAdd {...props} />;
    case 'delete':
      return <Delete {...props} />;
    case 'search':
      return <Search {...props} />;
    case 'print':
      return <Print {...props} />;
    case 'visibility':
      return <Visibility {...props} />;
    case 'visibilityOff':
      return <VisibilityOff {...props} />;
    case 'address':
      return <Address {...props} />;
    case 'arrowRight':
      return <ArrowRight {...props} />;
    case 'arrowLeft':
      return <ArrowLeft {...props} />;
    default:
      return <div />;
  }
};

export default Icon;
