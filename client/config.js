const IS_DEBUG_MODE = !!window.location.href.indexOf('localhost');

module.exports = {
  API_HOST: IS_DEBUG_MODE
    ? 'http://localhost:9080'
    : 'https://yuchung.herokuapp.com/',
};
