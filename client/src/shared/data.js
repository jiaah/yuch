import React from 'react';

export const admin = { companyName: '유청' };

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
    to: 'client/catering/dd',
    className: 'c-text',
  },
  {
    id: 2,
    name: '식수현황',
    to: 'client/catering/mm',
    className: 'c-text',
  },
  {
    id: 3,
    name: '계정',
    to: 'client/account',
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
    name: '지불현황',
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
      to: 'admin/count/catering/dd',
    },
    {
      id: 12,
      name: '금일 유청식당 식수현황',
      to: 'admin/count/restaurant/dd',
    },
    {
      id: 13,
      name: '월별 식수현황',
      to: 'admin/count/company/mm',
    },
    {
      id: 14,
      name: '회사별 식수현황',
      to: 'admin/count/company/clientlist',
    },
  ],
  2: [
    {
      id: 11,
      name: '지불 관리',
      to: 'admin/revenue/payment/management',
    },
    {
      id: 12,
      name: '지불 현황',
      to: 'admin/revenue/payment/status',
    },
  ],
  3: [
    {
      id: 11,
      name: '매출 현황',
      to: 'admin/revenue',
    },
  ],
  4: [
    {
      id: 11,
      name: '식수 가격',
      to: 'admin/account/catering/rates',
    },
    {
      id: 12,
      name: '고객 계정',
      to: 'admin/account/clientlist',
    },
    {
      id: 13,
      name: '유청 계정',
      to: 'admin/account',
    },
    {
      id: 14,
      name: '유청 계좌',
      to: 'admin/account/bankaccount',
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
    success: `예약 상담과 확정을 위해 24시간 이내로 연락을 드리겠습니다. 만약 연락을 못받으시면, ${
      admin.companyName
    }으로 연락주시길 바랍니다.`,
    error: `프로그램 오류로 예약신청이 전송되지 않았습니다. ${
      admin.companyName
    }으로 전화해주시기 바랍니다. 불편을 끼쳐드려 죄송합니다.`,
  },
};

export const userAccountTableHeadRows = [
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
    id: 'mealPrice',
    numeric: true,
    disablePadding: false,
    label: '식수가격',
  },
  {
    id: 'lunchQty',
    numeric: true,
    disablePadding: false,
    label: '중식 식수량',
  },
  {
    id: 'dinnerQty',
    numeric: true,
    disablePadding: false,
    label: '저녁 식수량',
  },
  {
    id: 'bankAccountId',
    numeric: true,
    disablePadding: false,
    label: '결제계좌',
  },
];

export const bankAccountTableHeadRows = [
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

export const bankAccountPageInfoA = (
  <React.Fragment>
    {admin.companyName} 고객 업체에게&#8201;
    <span className="c-point2">
      등록되어있는 계좌 그룹을 유지하고&#44;&#8201;
    </span>
    &#8201;계좌 정보 변경만 원하시면&#44;&#8201;&#8201;
    <span className="c-point2">계좌를 수정 해주세요&#46;</span>
  </React.Fragment>
);

export const bankAccountPageInfoB = (
  <React.Fragment>
    <span className="c-point2">새로운 계좌 등록 혹은 삭제 시&#44;</span>
    &#8201;&#8201;&#39;계정 &#62; 고객계정&#39; 으로 이동하여&#44;&#8201;&#8201;
    <span className="c-point2">
      반드시 새로운 계좌를 고객 업체에 등록해주세요&#46;
    </span>
  </React.Fragment>
);

export const userAccountPageInfo = (
  <React.Fragment>
    모든 고객 계정을 보길 원하신다면 상단의 고객 계정을 클릭해 주세요.
  </React.Fragment>
);

export const adminConfirmIconWarning =
  '데이터가 시스템에서 삭제 됩니다. 삭제된 데이터는 복구할수없습니다.';

export const adminConfirmMessage = (
  <p>
    정말 삭제하시겠습니까?
    <br />
    진행하시려면&#44;&#8201; 보안을 위해&#8201;
    <span className="c-point2">
      {admin.companyName}
      님의 비밀번호
    </span>
    를 입력해주세요&#46;
  </p>
);
