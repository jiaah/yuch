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
    to: '/',
    className: 'c-text',
  },
  {
    id: 2,
    name: '식수현황',
    to: '/',
    className: 'c-text',
  },
  {
    id: 3,
    name: '계정',
    to: '/user/account',
    className: 'c-text',
  },
];

export const navAdminList = [
  {
    id: 1,
    name: '식수현황',
    to: '/',
  },
  {
    id: 2,
    name: '지불현황',
    to: '/',
  },
  {
    id: 3,
    name: '매출현황',
    to: '/user/account',
  },
  {
    id: 4,
    name: '계정',
    to: '/user/account',
  },
];

export const navAdminItems = {
  1: [
    {
      id: 11,
      name: '금일 위탁급식 식수현황',
      to: '/',
    },
    {
      id: 12,
      name: '금일 유청식당 식수현황',
      to: '/',
    },
    {
      id: 13,
      name: '월별 식수현황',
      to: '/user/account',
    },
    {
      id: 14,
      name: '회사별 식수현황',
      to: '/user/account',
    },
  ],
  2: [
    {
      id: 11,
      name: '지불 관리',
      to: '/',
    },
    {
      id: 12,
      name: '지불 현황',
      to: '/',
    },
  ],
  3: [
    {
      id: 11,
      name: '매출 현황',
      to: '/',
    },
  ],
  4: [
    {
      id: 11,
      name: '고객 계정',
      to: '/',
    },
    {
      id: 12,
      name: '식수 가격',
      to: '/',
    },
    {
      id: 13,
      name: '유청 입급 계좌',
      to: '/user/account',
    },
  ],
};

export const message = {
  auth: {
    loggedInUser: '회원님은 이미 로그인 되어있습니다.',
    loginFailed:
      '아이디 또는 비밀번호를 다시 확인하세요. 아이디 또는 비밀번호를 잘못 입력하셨습니다.',
  },
  reserve: {
    success:
      '예약 상담과 확정을 위해 24시간 이내로 연락을 드리겠습니다. 만약 연락을 못받으시면, 유청으로 연락주시길 바랍니다.',
    error:
      '프로그램 오류로 예약신청이 전송되지 않았습니다. 유청으로 전화해주시기 바랍니다. 불편을 끼쳐드려 죄송합니다.',
  },
};
