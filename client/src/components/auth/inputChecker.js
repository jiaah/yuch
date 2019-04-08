export const signUpInputChecker = userInfo => {
  const { username, password, companyName, contactNumber } = userInfo;
  if (
    username === '' ||
    username === undefined ||
    password === '' ||
    password === undefined ||
    companyName === '' ||
    companyName === undefined ||
    contactNumber === '' ||
    contactNumber === undefined
  )
    return null;
};

export const loginInputChecker = (username, password) => {
  if (
    username === '' ||
    username === undefined ||
    password === '' ||
    password === undefined
  )
    return null;
};
