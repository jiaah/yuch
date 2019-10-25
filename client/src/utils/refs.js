export const createInputArray = async num => {
  const promises = [];
  for (let i = 0; i < num; i++) {
    promises.push(`input${i}`);
  }
  const arr = await Promise.all(promises);
  return arr;
};
