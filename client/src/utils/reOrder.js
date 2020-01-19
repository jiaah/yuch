export const orderByPositions = async data => {
  const positions = [
    '사장',
    '부사장',
    '매니저',
    '주방장',
    '주방보조',
    '부장',
    '기사',
    '직원',
  ];

  const owner = data.filter(i => i.position === positions[0]);
  const vicePresident = data.filter(i => i.position === positions[1]);
  const manager = data.filter(i => i.position === positions[2]);
  const chef = data.filter(i => i.position === positions[3]);
  const subChef = data.filter(i => i.position === positions[4]);
  const deliveryManager = data.filter(i => i.position === positions[5]);
  const deliveryMen = data.filter(i => i.position === positions[6]);
  const workers = data.filter(i => i.position === positions[7]);

  const orderedData = [
    ...owner,
    ...vicePresident,
    ...manager,
    ...chef,
    ...subChef,
    ...deliveryManager,
    ...deliveryMen,
    ...workers,
  ];

  return orderedData;
};
