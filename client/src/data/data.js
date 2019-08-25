export const admin = {
  companyName: '유청',
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
    name: '금일식수',
    to: '/user/catering',
    className: 'c-text',
  },
  {
    id: 2,
    name: '식수현황',
    to: '/user/catering/mm',
    className: 'c-text',
  },
  {
    id: 3,
    name: '계정',
    to: '/user/account/me',
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
    name: '매출현황',
  },
  {
    id: 4,
    name: '계정',
  },
];

export const navAdminItems = {
  1: [
    {
      id: 11,
      name: '금일 위탁급식 식수현황',
      to: '/admin/count/catering/dd',
    },
    {
      id: 12,
      name: '금일 식당 매출현황',
      to: '/admin/count/restaurant/dd',
    },
    {
      id: 13,
      name: '특식 등록',
      to: '/admin/count/specialmeal',
    },
  ],
  2: [
    {
      id: 11,
      name: '회사별 거래명세서',
      to: '/admin/invoice/users',
    },
  ],
  3: [
    {
      id: 11,
      name: '월별 매출 내역',
      to: '/admin/revenue/mm',
    },
    {
      id: 12,
      name: '매출 현황',
      to: '/admin/revenue',
    },
  ],
  4: [
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
      id: 13,
      name: `${admin.companyName} 계정`,
      to: '/admin/account/me',
    },
    {
      id: 14,
      name: `${admin.companyName} 계좌`,
      to: '/admin/account/bankaccount',
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
    id: 'mealPrice',
    numeric: true,
    disablePadding: false,
    label: '식수가격[변동가]',
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
  {
    id: 'businessType',
    numeric: true,
    disablePadding: false,
    label: '비지니스',
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
    label: '적용되는 날짜',
  },
];
