export const signUpInputChecker = userInfo => {
  const {
    username,
    password,
    companyName,
    contactNumber,
    confirmPassword,
  } = userInfo;
  if (
    username === '' ||
    username === undefined ||
    password === '' ||
    password === undefined ||
    confirmPassword === '' ||
    confirmPassword === undefined ||
    password !== confirmPassword ||
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
