export const userAccountInputChecker = userInputValue => {
  const {
    username,
    password,
    companyName,
    contactNumber,
    confirmPassword,
    mealPrice,
    lunchQuantity,
    dinnerQuantity,
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
    (contactNumber !== '' && isNaN(contactNumber)) ||
    mealPrice === '' ||
    mealPrice === undefined ||
    (mealPrice !== '' && isNaN(mealPrice)) ||
    (lunchQuantity !== '' && isNaN(lunchQuantity)) ||
    (dinnerQuantity !== '' && isNaN(dinnerQuantity))
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
