export const createForLoopArray = async (num, name) => {
  const promises = [];
  for (let i = 0; i < num; i++) {
    promises.push(`${name}${i}`);
  }
  const arr = await Promise.all(promises);
  return arr;
};
