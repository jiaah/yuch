function makeMeSandwich(req) {
  if (typeof req.query.sandwich !== 'string') {
    return null;
  }
  return req.query.sandwich;
}

export default makeMeSandwich;
