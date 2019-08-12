export const getToken = () => localStorage.token;
export const isLoggedIn = () => !!localStorage.token;
export const saveUserToken = (token, keepUserLoggedIn) => {
  localStorage.setItem('token', token);
  // keepUserLoggedIn state is always saved in localStorage (thanks to redux-persist) regardless of user's choice.
  // save keepUserLoggedIn state in session storage to prevent from logging out a user on refresh.
  // (check routes/authGuards.js)
  return !keepUserLoggedIn
    ? sessionStorage.setItem('keepUserLoggedIn', keepUserLoggedIn)
    : null;
};

export const clearStorage = () => {
  localStorage.clear();
  return sessionStorage.clear();
};
