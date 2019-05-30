export const getToken = () => localStorage.token;
export const isLoggedIn = () => !!localStorage.token;
export const saveUserToken = token => localStorage.setItem('token', token);
export const clearLocalStorage = () => localStorage.clear();
