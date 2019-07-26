export const getToken = () => localStorage.token;
export const isLoggedIn = () => !!localStorage.token;
export const saveUserToken = (token, keepLoggedIn) => {
  localStorage.setItem('token', token);
  // keepLoggedIn state is always saved in localStorage (thanks to redux-persist) regardless of user's choice.
  // save keepLoggedIn state in session storage to prevent from logging out a user on refresh.
  // (check routes/authGuards.js)
  return !keepLoggedIn
    ? sessionStorage.setItem('keepLoggedIn', keepLoggedIn)
    : null;
};

export const clearStorage = () => {
  localStorage.clear();
  return sessionStorage.clear();
};
