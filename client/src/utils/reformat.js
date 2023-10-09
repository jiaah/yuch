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
  if ( ! isNaN( a.companyName ) &&  ! isNaN( b.companyName )  ) return a.companyName - b.companyName;
  var companyNameA = a.companyName.toString();
  var companyNameB = b.companyName.toString();
  return ( companyNameA < companyNameB ) ? -1 : ( companyNameA == companyNameB ) ? 0 : 1;
}
