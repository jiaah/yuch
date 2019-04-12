export const getToken = () => localStorage.token;
export const getCompanyName = () => localStorage.companyName;
export const isLoggedIn = () => !!localStorage.token;
export const saveUserNameAndToken = userData => {
  localStorage.setItem('token', userData.token);
  localStorage.setItem('companyName', userData.companyName);
};
export const clearLocalStorage = () => localStorage.clear();
