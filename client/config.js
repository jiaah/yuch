let IS_DEV_MODE = false;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  IS_DEV_MODE = true;
}

const URL = IS_DEV_MODE ? '/api' : 'https://yu-chung.com/api';

module.exports = {
  API_HOST: URL,
};
