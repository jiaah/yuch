import setAge from '../setAge';

test('return even number if the number is not even ', () => {
  const result = setAge(3);
  expect(result).toBe(4);
});
