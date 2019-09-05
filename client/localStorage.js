// access token
export const isLoggedIn = () => !!localStorage.token;
export const getToken = () => localStorage.token;
export const saveToken = token => localStorage.setItem('token', token);

// refresh token
export const getRefreshToken = () => localStorage.refreshToken;
export const saveRefreshToken = refreshToken =>
  localStorage.setItem('refreshToken', refreshToken);

// save tokens
export const saveUserTokens = (tokenData, keepUserLoggedIn) => {
  const { token, refreshToken } = tokenData;
  saveToken(token);
  saveRefreshToken(refreshToken);
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
