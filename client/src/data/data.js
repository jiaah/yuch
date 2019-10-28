// startTime must be fist day of month
export const admin = {
  companyName: '유청',
  address: '경주시 황성동 1071-1번지 ',
  addressSub: '강남골프장 맞은편',
  startTime: '20190901',
  startYear: '2019',
  contactNo1: '(054) 745 - 0999',
  contactNo1Link: '+82-54-745-0999',
  contactNo2: '054 . 745 . 0999',
  contactNo3: '010 . 8034 . 0057',
  contactNo3Link: '+82-10-8034-0057',
};

export const navHome = [
  {
    id: 1,
    name: '위탁급식/식당',
    to: '#home-main',
    className: 'c-text',
  },
  {
    id: 2,
    name: '온라인 예약',
    to: '#reserve',
    className: 'c-text',
  },
  {
    id: 3,
    name: '위치/오픈시간',
    to: '#board',
    className: 'c-text',
  },
];

export const navClient = [
  {
    id: 1,
    name: '식수현황',
    to: '/user/catering',
    className: 'c-text',
  },
  {
    id: 2,
    name: '특식',
    to: '/user/special-meal',
    className: 'c-text',
  },
  {
    id: 3,
    name: '인보이스',
    to: '/invoice/user',
    className: 'c-text',
  },
  {
    id: 4,
    name: '계정',
    to: '/user/account',
    className: 'c-text',
  },
];

export const navAdminList = [
  {
    id: 1,
    name: '식수현황',
  },
  {
    id: 2,
    name: '인보이스',
  },
  {
    id: 3,
    name: '고객관리',
  },
  {
    id: 4,
    name: '유청계정',
  },
];

export const navAdminItems = {
  1: [
    {
      id: 11,
      name: '위탁급식 식수',
      to: '/admin/count/catering/dd',
    },
    {
      id: 12,
      name: '식당 식수',
      to: '/admin/count/restaurant/companies/dd',
    },
    {
      id: 13,
      name: '식당 매출',
      to: '/admin/count/restaurant/dd',
    },
    {
      id: 14,
      name: '특식',
      to: '/admin/count/specialmeal',
    },
  ],
  2: [
    {
      id: 11,
      name: '거래 명세서',
      to: '/admin/invoice/users',
    },
    {
      id: 12,
      name: '유청 매출 현황',
      to: '/admin/revenue',
    },
  ],
  3: [
    {
      id: 11,
      name: '식수 가격',
      to: '/admin/account/rates',
    },
    {
      id: 12,
      name: '고객 계정',
      to: '/admin/account/users',
    },
    {
      id: 14,
      name: '고객 사업자번호',
      to: '/admin/account/business',
    },
    {
      id: 15,
      name: '고객 가이드',
      to: '/admin/account/user/guide',
    },
    {
      id: 13,
      name: '배달 루트',
      to: '/admin/account/delivery',
    },
  ],
  4: [
    {
      id: 12,
      name: `직원`,
      to: '/admin/account/employees',
    },
    {
      id: 11,
      name: `거래처`,
      to: '/admin/account/partners',
    },
    {
      id: 13,
      name: `${admin.companyName} 계정`,
      to: '/admin/account',
    },
    {
      id: 14,
      name: `${admin.companyName} 계좌`,
      to: '/admin/account/bank',
    },
  ],
};

export const message = {
  auth: {
    loggedInUser: '회원님은 이미 로그인 되어있습니다.',
    loginFailed: '아이디 또는 비밀번호 오류입니다.',
    unauthenticated: '로그인을 해주세요.',
  },
  reserve: {
    success: `예약 상담과 확정을 위해 24시간 이내로 연락을 드리겠습니다. 만약 연락을 못받으시면, ${
      admin.companyName
    }으로 연락주시길 바랍니다.`,
    error: `프로그램 오류로 예약신청이 전송되지 않았습니다. ${
      admin.companyName
    }으로 전화해주시기 바랍니다. 불편을 끼쳐드려 죄송합니다.`,
  },
};

export const userAccountTableHeadColumns = [
  {
    id: '1',
    numeric: true,
    disablePadding: true,
    label: '',
  },
  {
    id: 'companyName',
    numeric: true,
    disablePadding: false,
    label: '업체명',
  },
  { id: 'username', numeric: true, disablePadding: false, label: '아이디' },
  {
    id: 'contactNo',
    numeric: true,
    disablePadding: false,
    label: '연락처',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'e-mail',
  },
  {
    id: 'lunchQty',
    numeric: true,
    disablePadding: false,
    label: '중식식수량',
  },
  {
    id: 'dinnerQty',
    numeric: true,
    disablePadding: false,
    label: '석식식수량',
  },
  {
    id: 'lateNightSnackQty',
    numeric: true,
    disablePadding: false,
    label: '야식식수량',
  },
  {
    id: 'mealPrice',
    numeric: true,
    disablePadding: false,
    label: '식수가격',
  },
  {
    id: 'bankAccountId',
    numeric: true,
    disablePadding: false,
    label: '결제계좌',
  },
  {
    id: 'address',
    numeric: true,
    disablePadding: false,
    label: '주소',
  },
  // {
  //   id: 'businessNo',
  //   numeric: true,
  //   disablePadding: false,
  //   label: '사업자번호',
  // },
  {
    id: 'businessType',
    numeric: true,
    disablePadding: false,
    label: '비지니스',
  },
  {
    id: 'startDate',
    numeric: true,
    disablePadding: false,
    label: '시작일',
  },
  {
    id: 'endDate',
    numeric: true,
    disablePadding: false,
    label: '종료일',
  },
];

export const bankAccountTableHeadColumns = [
  {
    id: '1',
    numeric: true,
    disablePadding: true,
    label: '',
  },
  {
    id: 'accountHolder',
    numeric: true,
    disablePadding: false,
    label: '예금주',
  },
  { id: 'bankName', numeric: true, disablePadding: false, label: '은행명' },
  {
    id: 'accountNo',
    numeric: true,
    disablePadding: false,
    label: '계좌번호',
  },
];

export const cateringRatesTableHeadColumns = [
  {
    id: '1',
    numeric: true,
    disablePadding: true,
    label: '',
  },
  {
    id: 'companyName',
    numeric: true,
    disablePadding: false,
    label: '업체명',
  },
  {
    id: 'mealPrice',
    numeric: true,
    disablePadding: false,
    label: '식수가격',
  },
  {
    id: 'reservePrice',
    numeric: true,
    disablePadding: false,
    label: '변동가격',
  },
  {
    id: 'reserveDate',
    numeric: true,
    disablePadding: false,
    label: '적용일자',
  },
];

export const usersCateringTableHeadColumns = [
  {
    id: '1',
    numeric: true,
    disablePadding: true,
    label: '',
  },
  {
    id: '2',
    numeric: true,
    disablePadding: true,
    label: '',
  },
  {
    id: 'companyName',
    numeric: true,
    disablePadding: false,
    label: '업체명',
  },
  {
    id: 'lunchQty',
    numeric: true,
    disablePadding: false,
    label: '중식',
  },
  {
    id: 'dinnerQty',
    numeric: true,
    disablePadding: false,
    label: '석식',
  },
  {
    id: 'lateNightSnackQty',
    numeric: true,
    disablePadding: false,
    label: '야식',
  },
];

export const specialMealTableHeadColumns = [
  {
    id: '1',
    numeric: true,
    disablePadding: true,
    label: '',
  },
  {
    id: 'companyName',
    numeric: true,
    disablePadding: false,
    label: '고객명',
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: '일자',
  },
  {
    id: 'time',
    numeric: true,
    disablePadding: false,
    label: '시간',
  },
  {
    id: 'sideDish',
    numeric: true,
    disablePadding: false,
    label: '반찬수',
  },
  {
    id: 'quantity',
    numeric: true,
    disablePadding: false,
    label: '식수량',
  },
  {
    id: 'mealPrice',
    numeric: true,
    disablePadding: false,
    label: '식수가격',
  },
  {
    id: 'sumTotal',
    numeric: true,
    disablePadding: false,
    label: '합계금액',
  },
  {
    id: 'address',
    numeric: true,
    disablePadding: false,
    label: '주소',
  },
  {
    id: 'contactNo',
    numeric: true,
    disablePadding: false,
    label: '연락처',
  },
  {
    id: 'note',
    numeric: true,
    disablePadding: false,
    label: '메모',
  },
  {
    id: 'payment',
    numeric: true,
    disablePadding: false,
    label: '고객사 등록',
  },
];

export const clientSpecialMealTableHeadColumns = [
  {
    id: 'companyName',
    numeric: true,
    disablePadding: false,
    label: '고객명',
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: '일자',
  },
  {
    id: 'time',
    numeric: true,
    disablePadding: false,
    label: '시간',
  },
  {
    id: 'sideDish',
    numeric: true,
    disablePadding: false,
    label: '반찬수',
  },
  {
    id: 'quantity',
    numeric: true,
    disablePadding: false,
    label: '식수량',
  },
  {
    id: 'mealPrice',
    numeric: true,
    disablePadding: false,
    label: '식수가격',
  },
  {
    id: 'sumTotal',
    numeric: true,
    disablePadding: false,
    label: '합계금액',
  },
  {
    id: 'address',
    numeric: true,
    disablePadding: false,
    label: '주소',
  },
  {
    id: 'contactNo',
    numeric: true,
    disablePadding: false,
    label: '연락처',
  },
  {
    id: 'note',
    numeric: true,
    disablePadding: false,
    label: '메모',
  },
];

export const invoiceColumns = [
  {
    id: 'companyName',
    numeric: true,
    disablePadding: false,
    label: '고객명',
  },
  {
    id: 'mealPrice',
    numeric: true,
    disablePadding: false,
    label: '식수가격',
  },
  {
    id: 'sumTotal',
    numeric: true,
    disablePadding: false,
    label: '합계금액',
  },
];

export const userInvoiceColumns = [
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: '일자',
  },
  {
    id: 'lunchQty',
    numeric: true,
    disablePadding: false,
    label: '중식',
  },
  {
    id: 'dinnerQty',
    numeric: true,
    disablePadding: false,
    label: '석식',
  },
  {
    id: 'lateNightSnackQty',
    numeric: true,
    disablePadding: false,
    label: '야식',
  },
  {
    id: 'mealPrice',
    numeric: true,
    disablePadding: false,
    label: '식수가격',
  },
  {
    id: 'total',
    numeric: true,
    disablePadding: false,
    label: '합계',
  },
];

export const revenueColumns = [
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: '일자',
  },
  {
    id: 'sumTotalInvoice',
    numeric: true,
    disablePadding: false,
    label: '위탁급식',
  },
  {
    id: 'sumTotalSpecialMeal',
    numeric: true,
    disablePadding: false,
    label: '특식',
  },
  {
    id: 'sumTotalResto',
    numeric: true,
    disablePadding: false,
    label: '레스토랑',
  },
  {
    id: 'sumTotal',
    numeric: true,
    disablePadding: false,
    label: '합계',
  },
];

export const userBusinessColumns = [
  {
    id: 'companyName',
    numeric: true,
    disablePadding: false,
    label: '고객명',
  },
  {
    id: 'businessNo',
    numeric: true,
    disablePadding: false,
    label: '사업자 번호',
  },
];

export const employeeColumns = [
  {
    id: '1',
    numeric: true,
    disablePadding: true,
    label: '',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: '직원명',
  },
  {
    id: 'accountHolder',
    numeric: true,
    disablePadding: false,
    label: '예금주',
  },
  { id: 'bankName', numeric: true, disablePadding: false, label: '은행명' },
  {
    id: 'accountNo',
    numeric: true,
    disablePadding: false,
    label: '계좌번호',
  },
  {
    id: 'contactNo',
    numeric: true,
    disablePadding: false,
    label: '연락처',
  },

  {
    id: 'startDate',
    numeric: true,
    disablePadding: false,
    label: '시작일',
  },
  {
    id: 'position',
    numeric: true,
    disablePadding: false,
    label: '직책',
  },
  {
    id: 'address',
    numeric: true,
    disablePadding: false,
    label: '주소',
  },
];

export const partnerColumns = [
  {
    id: '1',
    numeric: true,
    disablePadding: true,
    label: '',
  },
  {
    id: 'companyName',
    numeric: true,
    disablePadding: false,
    label: '업체명',
  },
  {
    id: 'accountHolder',
    numeric: true,
    disablePadding: false,
    label: '예금주',
  },
  { id: 'bankName', numeric: true, disablePadding: false, label: '은행명' },
  {
    id: 'accountNo',
    numeric: true,
    disablePadding: false,
    label: '계좌번호',
  },
  {
    id: 'contactNo',
    numeric: true,
    disablePadding: false,
    label: '연락처',
  },
];

export const employeeContactColumns = [
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: '직원명',
  },
  {
    id: 'contactNo',
    numeric: true,
    disablePadding: false,
    label: '연락처',
  },
];

export const employeeBankColumns = [
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: '직원명',
  },
  {
    id: 'accountHolder',
    numeric: true,
    disablePadding: false,
    label: '예금주',
  },
  { id: 'bankName', numeric: true, disablePadding: false, label: '은행명' },
  {
    id: 'accountNo',
    numeric: true,
    disablePadding: false,
    label: '계좌번호',
  },
];

export const userMealPriceColumns = [
  {
    id: 'startedAt',
    numeric: true,
    disablePadding: false,
    label: '시작일',
  },
  {
    id: 'endedAt',
    numeric: true,
    disablePadding: false,
    label: '종료일',
  },
  {
    id: 'mealPrice',
    numeric: true,
    disablePadding: false,
    label: '식수가격',
  },
];

export const revenueChartMultiLines = [
  { label: '레스토랑', name: 'sumTotalResto', color: '#3ab61a' },
  { label: '특식', name: 'sumTotalSpecialMeal', color: '#43a4f3' },
];

export const revenueChartlist = [
  { label: '위탁급식', name: 'sumTotalInvoice', color: '#D164E8' },
  { label: '유청', name: 'sumTotal', color: '#ed6802' },
];
