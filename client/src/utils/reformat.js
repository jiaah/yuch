// to save number type data in database
export const emptyStrToNull = str => {
  let newStr;
  if (!str) {
    newStr = null;
  } else {
    newStr = str;
  }
  return newStr;
};
