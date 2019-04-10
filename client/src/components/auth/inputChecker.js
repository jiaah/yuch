export const userAccountInputChecker = userInputValue => {
  const {
    username,
    password,
    companyName,
    contactNumber,
    confirmPassword,
    mealPrice,
  } = userInputValue;
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
    contactNumber === undefined ||
    mealPrice === '' ||
    mealPrice === undefined
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
