const IS_DEV_MODE = !!window.location.href.indexOf('localhost');

module.exports = {
  API_HOST: IS_DEV_MODE
    ? 'http://localhost:9080'
    : 'https://yuchung.herokuapp.com',
};
