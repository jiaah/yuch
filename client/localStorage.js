export const getToken = () => localStorage.token;
export const isLoggedIn = () => !!localStorage.token;
export const saveUserToken = (token, keepLoggedIn) => {
  localStorage.setItem('token', token);
  return keepLoggedIn
    ? localStorage.setItem('keepLoggedIn', keepLoggedIn)
    : window.sessionStorage.setItem('keepLoggedIn', keepLoggedIn);
};

export const clearLocalStorage = () => localStorage.clear();
