export const ccyFormat = num => `${num.toFixed(2)}`;

export const formatNumber = num =>
  num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

export const combinedFormat = num => {
  const cyyFormattedNum = ccyFormat(num);
  const formattedNum = formatNumber(cyyFormattedNum);
  return formattedNum;
};

export const removeSpecialCharacters = str => {
  const regExp = /\W+/g;
  return str.replace(regExp, '');
};
