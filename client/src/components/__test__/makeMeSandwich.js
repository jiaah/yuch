import makeMeSandwich from '../makeMeSandwich';

function getReq(sandwich) {
  return { query: { sandwich } };
}

test('returns null if the sandwich does not exist', () => {
  const req = getReq();
  const result = makeMeSandwich(req);
  expect(result).toBeNull();
});

test('returns my sandwich', () => {
  const sandwich = 'Monte Cristo';
  const req = getReq(sandwich);
  const result = makeMeSandwich(req);
  expect(result).toBe(sandwich);
});
