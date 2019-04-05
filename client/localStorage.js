export const getToken = () => localStorage.token;

export const isLoggedIn = () => !!localStorage.token;

export const saveToken = token => localStorage.setItem('token', token);

export const deleteToken = () => localStorage.removeItem('token');
