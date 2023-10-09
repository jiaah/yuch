export const ccyFormat = num => `${num.toFixed(0)}`;

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

export const ascending = ( a , b ) => {
  if ( ! isNaN( a ) &&  ! isNaN( b )  ) return a - b;
  var a = a.toString();
  var b = b.toString();
  return ( a < b ) ? -1 : ( a == b ) ? 0 : 1;
}
