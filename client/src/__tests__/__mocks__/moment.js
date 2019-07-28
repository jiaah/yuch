const moment = require('moment');

moment.now = () => +new Date();
export default (timestamp = 0) => timestamp;
