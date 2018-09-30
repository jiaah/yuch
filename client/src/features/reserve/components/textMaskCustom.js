import React from 'react';
import MaskedInput from 'react-text-mask';

const TextMaskCustom = props => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[
        '(',
        ' ',
        /[0-9]/,
        /\d/,
        /\d/,
        ' ',
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        '-',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      // placeholderChar={'\u2000'}
      showMask={false}
    />
  );
};

export default TextMaskCustom;
