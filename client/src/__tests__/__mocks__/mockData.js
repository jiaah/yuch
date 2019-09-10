export const inThreeDays = '2020-11-06';
export const now = '11 06 2020, 11:35 20';
export const keepMeLoggedIn = false;
export const username = 'yuchung';
export const password = 'testingpwd12';
export const newPassword = 'newPwd1234';
export const id = '8f5af680-973e-11e4-ad43-a13a6';
export const token = '8f5af680-973e-11e4-ad43-4ee58e9a13a6';
export const refreshToken = '8f5af680-973e-11e4-ad43-4ee58e9a13a6';
export const companyName = 'yuchung';
export const isAdmin = true;
export const email = 'yuchung@gmail.com';
export const contactNo = '010-2929-3030';
export const address = 'yuchung 1071-1';
export const mealPrice = '8500';
export const date = '2019-08-20';
export const bankInfo = {
  id: '8f5af680-973e-11e4-ad43-a13a6',
  bankname: 'RBC',
  accountHolder: 'yuchung',
  accountNo: '010-2929-3030',
};

export const httpInitState = {
  api: '',
  isLoading: false,
  data: [],
  error: '',
};

export const reserveUpdatedState = {
  api: 'reserve',
  isLoading: false,
  data: [],
  error: '',
};

export const reserveInfoInit = {
  name: '',
  contact: '(0  )    -    ',
  number: '',
  place: '',
  date: inThreeDays,
  time: '12:30',
};

export const reserveContents = {
  name: 'Jiah Lee',
  contact: '(010)2542-1222',
  number: '60',
  place: '경주 교회',
  date: '2019-11-11',
  time: '12:30',
  createdAt: now,
};

export const caterings = [
  {
    userId: '0',
    catering: [
      { date: '190918', lunchQty: 20, dinnerQty: 40, lateNightSnackQty: 10 },
      { date: '190919', lunchQty: 30, dinnerQty: 10, lateNightSnackQty: 5 },
      { date: '190920', lunchQty: 10, dinnerQty: 50, lateNightSnackQty: 0 },
    ],
  },
  {
    userId: '1',
    catering: [
      { date: '190918', lunchQty: 10, dinnerQty: 15, lateNightSnackQty: 9 },
      { date: '190919', lunchQty: 0, dinnerQty: 3, lateNightSnackQty: 5 },
      {
        date: '190920',
        lunchQty: 0,
        dinnerQty: 0,
        defaultLunchQty: 5,
        defaultDinnerQty: 0,
        lateNightSnackQty: 6,
      },
    ],
  },
];

export const cateringYes = {
  date: '2019-09-09',
  lunchQty: 10,
  dinnerQty: 15,
  lateNightSnackQty: 9,
};
export const cateringToday = {
  date: '2019-09-10',
  lunchQty: 0,
  dinnerQty: 3,
  lateNightSnackQty: 5,
};
export const cateringTmr = {
  date: '2019-09-11',
  lunchQty: 0,
  dinnerQty: 0,
  lateNightSnackQty: 6,
};
