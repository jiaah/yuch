export const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

export const getSorting = (order, orderBy) =>
  order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);

export const divideInTow = data => {
  let sortedDataA;
  let sortedDataB;
  if (data && data.length <= 10) {
    sortedDataA = data;
    sortedDataB = [];
  }
  if (data && data.length > 10) {
    const line =
      data.length % 2 === 0 ? data.length / 2 : data.length / 2 + 0.5;
    sortedDataA = data.slice(0, line);
    sortedDataB = data.slice(line, data.length);
  }
  return { sortedDataA, sortedDataB };
};

export const divideInTwoWithSort = (data, order, orderBy) => {
  let sortedDataA;
  let sortedDataB;
  if (data && data.length <= 10) {
    sortedDataA = stableSort(data, getSorting(order, orderBy));
    sortedDataB = [];
  }
  if (data && data.length > 10) {
    const line =
      data.length % 2 === 0 ? data.length / 2 : data.length / 2 + 0.5;
    sortedDataA = stableSort(data, getSorting(order, orderBy)).slice(0, line);
    sortedDataB = stableSort(data, getSorting(order, orderBy)).slice(
      line,
      data.length,
    );
  }
  return { sortedDataA, sortedDataB };
};
