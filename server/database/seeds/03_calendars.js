const moment = require('moment');

exports.seed = async knex => {
  await knex('calendars').del();

  const calendars = [];

  for (let i = 0; i < 30000; i++) {
    const date = moment('2010-01-01')
      .add(i, 'days')
      .format('YYYY-MM-DD');
    calendars.push({ date });
  }

  await knex('calendars').insert(calendars);
};
