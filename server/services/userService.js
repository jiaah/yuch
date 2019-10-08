const jwtDecode = require('jwt-decode');
const Users = require('../models/Users');
const util = require('../lib/util');

const inActive = async (userId, endDate) =>
  Users.query().patchAndFetchById(userId, {
    endDate,
    updated_at: new Date().toISOString(),
  });

const active = async (userId, startDate) =>
  Users.query().patchAndFetchById(userId, {
    startDate,
    endDate: '9999-12-31',
    updated_at: new Date().toISOString(),
  });

const isValid = async (id, refreshToken) => {
  const user = await Users.query().findOne({ id, refreshToken });
  return !!user;
};

const isActive = async id => {
  const user = await Users.query()
    .where({ id })
    .whereRaw('"endDate" < NOW()')
    .first();
  return !user;
};

const isAdmin = async id => {
  const user = await Users.query().findById(id);
  return user && user.isAdmin;
};

const findOneById = async id => Users.query().findById(id);

const findOneByUsername = async username => {
  const user = await Users.query().findOne({ username });
  return user;
};

const emptyRefreshToken = async id =>
  Users.query()
    .findById(id)
    .patch({
      refreshToken: null,
    });

const fetchRefreshToken = async id => {
  const refreshToken = await util.getRefreshToken(id);
  await Users.query()
    .findById(id)
    .patch({
      refreshToken,
    });
  return refreshToken;
};

const reNewRefreshToken = async id => {
  let refreshToken;
  const refreshExpiresIn = process.env.refreshExpiresIn || 120960000;
  const user = await findOneById(id);

  if (user && user.refreshToken) {
    refreshToken = user.refreshToken;
    const decodedToken = jwtDecode(user.refreshToken);
    const diffTimeStamp = Date.now() - decodedToken.createdAt;

    if (diffTimeStamp > refreshExpiresIn) {
      refreshToken = await fetchRefreshToken(id);
    }
  } else {
    refreshToken = await fetchRefreshToken(id);
  }
  return refreshToken;
};

module.exports = {
  isActive,
  inActive,
  active,
  isAdmin,
  emptyRefreshToken,
  findOneById,
  findOneByUsername,
  isValid,
  reNewRefreshToken,
};
