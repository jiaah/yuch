// access token
export const isLoggedIn = () => !!localStorage.token;
export const getToken = () => localStorage.token;
export const saveToken = token => localStorage.setItem('token', token);

// refresh token
export const getRefreshToken = () => localStorage.refreshToken;
export const saveRefreshToken = refreshToken =>
  localStorage.setItem('refreshToken', refreshToken);

// save tokens
export const saveUserTokens = (tokenData, keepMeLoggedIn) => {
  const { token, refreshToken } = tokenData;
  saveToken(token);
  saveRefreshToken(refreshToken);

  return !keepMeLoggedIn
    ? sessionStorage.setItem('keepMeLoggedIn', keepMeLoggedIn)
    : null;
};
// keepMeLoggedIn state is always saved in localStorage (thanks to redux-persist) regardless of user's choice.
// save keepMeLoggedIn state in session storage to prevent from logging out a user on refresh.
// (check routes/authGuards.js)

export const clearStorage = () => {
  localStorage.clear();
  return sessionStorage.clear();
};
