const IS_DEV_MODE = !!window.location.href.indexOf('localhost');
const URL = IS_DEV_MODE
  ? 'http://localhost:9080'
  : 'https://yuchung.herokuapp.com';

module.exports = {
  API_HOST: URL,
};
