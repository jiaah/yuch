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
    name: '위치/오픈시간',
    to: '#board',
    className: 'anchor td-none c-text',
  },
];

export const reserveSuccessMessage =
  '예약 상담과 확정을 위해 24시간 이내로 연락을 드리겠습니다. 만약 연락을 못받으시면, 유청으로 연락주시길 바랍니다.';

export const reserveErrorMessage =
  '프로그램 오류로 예약신청이 전송되지 않았습니다. 유청으로 전화해주시기 바랍니다. 불편을 끼쳐드려 죄송합니다.';

export const flashMessages = [
  {
    id: 1,
    status: 'loginFailed',
    variant: 'error',
    message:
      '아이디 또는 비밀번호를 다시 확인하세요. 아이디 또는 비밀번호를 잘못 입력하셨습니다.',
  },
  {
    id: 2,
    status: 'isAlreadyLoggedIn',
    variant: 'error',
    message: '회원님은 이미 로그인 되어있습니다.',
  },
];
