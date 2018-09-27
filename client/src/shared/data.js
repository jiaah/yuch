export const nav = [
  {
    id: 1,
    name: '위탁급식/식당',
    to: '#home-main',
    className: 'anchor td-none c-text',
  },
  {
    id: 2,
    name: '온라인 예약',
    to: '#reserve',
    className: 'anchor td-none c-text',
  },
  {
    id: 3,
    name: '연락처/오픈시간',
    to: '#board',
    className: 'anchor td-none c-text',
  },
];

export const redirectToLogin = [
  {
    id: 1,
    name: '로그인',
    to: '/login',
    className: 'td-none c-text br f-mini',
  },
];

export const redirectToHome = [
  {
    id: 1,
    name: 'YUCHUNG',
    to: '/',
    className: 'td-none tc f-en c-point1',
  },
];

export const loginForm = [
  {
    key: 1,
    // id: 'name',
    label: 'id',
    value: '',
  },
  {
    key: 2,
    // id: 'password',
    label: 'password',
    value: '',
  },
];

export const loginBtn = [
  {
    key: 1,
    name: '로그인',
    variant: 'outlined',
    color: 'secondary',
  },
  {
    key: 2,
    name: '가입하기',
    variant: 'contained',
    color: 'secondary',
  },
];
