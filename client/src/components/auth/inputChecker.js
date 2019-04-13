export const userAccountInputChecker = userInputValue => {
  const {
    contactNumber,
    mealPrice,
    lunchQuantity,
    dinnerQuantity,
  } = userInputValue;
  if (
    (contactNumber !== '' && isNaN(contactNumber)) ||
    (mealPrice !== '' && isNaN(mealPrice)) ||
    (lunchQuantity !== '' && isNaN(lunchQuantity)) ||
    (dinnerQuantity !== '' && isNaN(dinnerQuantity))
  )
    return null;
};
