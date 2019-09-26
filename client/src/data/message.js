import React from 'react';
import { Link } from 'react-router-dom';
/* --- Components --- */
import { admin } from './data';

export const headerMsgA = (
  <div className="header-text--box">
    <h1>
      <div className="header--no-msg f-en">NO MSG&#33;</div>
      <br />
      오늘도 열심히 일한 당신에게 <br />
      당신만을 위한{' '}
      <span className="header--text--point-color">착한 가격의 집밥을</span>
      선물하세요&#46;
    </h1>
  </div>
);

export const headerMsgB = (
  <div className="header-text--box">
    <h1>
      <div className="header--text f-en">위탁급식 전문업체</div>
      <br />
      공장, 사무실, 회사 연중 중식.석식.야식 배달
    </h1>
    <p className="white">* 인원에 따라 가격 상이함.</p>
    <div className="mt4">
      <a className="header--contact td-none" href="tel:+82-10-8034-0057">
        전화문의 및 상담환영
      </a>
    </div>
  </div>
);

export const headerMsgC = (
  <div className="header-text--box-c">
    <h1>
      <div className="header--text f-en">찾아가는 서비스</div>
      <br />
      성당, 교회 각종 행사모임{' '}
      <span className="header--text--point-color">출장뷔페</span>
      <div className="mt2 header--price">
        반찬 (6가지)&#8201;&#8201;&#8201;&#8201;&#8201; 6,000 원<br />
        반찬 (8가지)&#8201;&#8201;&#8201;&#8201;&#8201; 8,000 원<br />
        반찬 (10가지)&#8201;&#8201; 10,000 원
      </div>
    </h1>
  </div>
);

export const headerMsgD = (
  <div className="header-text--box">
    <h1>
      <div className="header--text f-en">레스토랑</div>
      <br />
      가정식 한식뷔페
      <br />
      당신을 위한{' '}
      <span className="header--text--point-color">4000원의 행복</span>을
      가지세요&#46;
    </h1>
    <p className="white">* 현금가</p>
  </div>
);

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

export const adminVerificationMessage = (
  <React.Fragment>
    계속 진행하시려면&#44;&#8201; 보안을 위해&#8201;
    <span className="c-point2">
      {admin.companyName}
      님의 비밀번호
    </span>
    를 입력해주세요&#46;
  </React.Fragment>
);

export const adminVerificationMessageOnDelete = (
  <React.Fragment>
    정말 삭제하시겠습니까&#63;
    <br />
    진행하시려면&#44;&#8201; 보안을 위해&#8201;
    <span className="c-point2">
      {admin.companyName}
      님의 비밀번호
    </span>
    를 입력해주세요&#46;
  </React.Fragment>
);

export const updateRateMessage = (
  <React.Fragment>
    <span className="c-point2">선택한 달 1일부터</span>
    &#8201; 가격변동이 적용됩니다&#46;
  </React.Fragment>
);

export const ratesPageInfo = (
  <React.Fragment>
    <span className="c-point2">식수가격 변동</span>은 상단의 메뉴&#8201;&#8201;
    <Link className="c-point2 td-none" to="/admin/account/rates">
      계정/식수가격 페이지
    </Link>
    &#8201; 에서 할 수 있습니다&#46;
  </React.Fragment>
);

export const createBankAccountMsg = (
  <div className="mb3">
    <p className="mb3">
      계좌를&#8201;
      <span className="c-point2">5개 이상</span> 등록할 수 없습니다&#46;
    </p>
    <p>
      등록한 계좌 중 사용하지 않는 계좌를 삭제하거나
      <span className="c-point2">&#8201;수정을 해주세요</span>
      &#46;
    </p>
  </div>
);

export const deleteBankAccountMsg = (
  <div className="mb3">
    <p className="mb3">
      계좌가 <span className="c-point2">최소한 하나</span>는 등록되어있어야
      합니다&#46;
    </p>
    <p>
      변경을 원하신다면, 새로운 계좌를 등록하거나
      <span className="c-point2">&#8201;수정을 해주세요</span>
      &#46;
    </p>
  </div>
);

export const userCateringMsg = (
  <div className="notice">
    <p className="pb3 b">- &#8201;금일 식수 변경 가능시간&#8201; &#45;</p>
    <p className="pb3 b">
      중식
      &#58;&#8201;&#8201;&#8201;&#8201;&#8201;&#8201;&#8201;&#8201;&#8201;&#8201;&#8201;&#8201;
      &#126; 금일 09 시 00 분<br />
      석식/야식 &#58;&#8201;&#8201; &#126; 금일 13 시 30 분<br />
    </p>
    <p className="f-mini">
      &#42; 변경 가능시간이 지난 후, 변경을 원하시면 {admin.companyName}
      으로 문의해주시기 바랍니다&#46;
    </p>
  </div>
);

export const adminCateringMsg = (
  <div className="notice">
    <p className="pb3 b">- &#8201;고객 금일 식수 변경 가능시간&#8201; &#45;</p>
    <p className="pb3 b">
      중식
      &#58;&#8201;&#8201;&#8201;&#8201;&#8201;&#8201;&#8201;&#8201;&#8201;&#8201;&#8201;&#8201;
      &#126; 금일 09 시 00 분<br />
      석식/야식 &#58;&#8201;&#8201; &#126; 금일 13 시 30 분<br />
    </p>
    <p className="f-mini">
      &#42; {admin.companyName}
      고객은 상단의 변경가능시간에만 식수변경이 가능합니다&#46;
      <br />
      &#42; {admin.companyName}은 지난 일자에 대한 식수변경을 이전 달 1일까지 할
      수 있습니다&#46;
    </p>
    <p className="f-mini pt2">
      &#42; <span className="c-point2">인보이스 발행 후 식수변경</span>을 한
      경우에는 <span className="c-point2">반드시</span> 인보이스 페이지에서{' '}
      <Link className="c-point2 td-none" to="/admin/invoice/users">
        {' '}
        업데이트 버튼
      </Link>
      을 눌러주시기 바랍니다&#46;
    </p>
    <p className="f-mini pt2">
      &#42; 휴먼계정으로 전환된 고객의 지난 식수량 변경하는 방법. <br />
      고객 계정을 활성화 &#8201;&#8594;&#8201;&#8201;
      <Link className="c-point2 td-none" to="/admin/count/catering/dd">
        식수현황/위탁급식식수
      </Link>{' '}
      에서 변경&#8201;&#8201;&#8594;
      <br />
      <span className="c-point2">인보이스 재발행</span>
      &#8201;&#8201;&#8594;&#8201;&#8201; 다시 휴먼계정으로 전환
    </p>
  </div>
);

export const endServiceMessageA = (
  <React.Fragment>
    <span className="c-point2">
      선택한 날로부터 저장된 모든 위탁급식 식수량이 삭제
    </span>
    되며&#44;&#8201; 이 날 이후로는 의도치 않은 식수량 등록을 방지하기위해, 이
    고객의 계정은 <span className="c-point2">휴면계정으로 전환</span>
    되어 로그인을 할 수가 없게됩니다 &#46;&#8201;&#8201;
  </React.Fragment>
);

export const endServiceMessageC = (
  <React.Fragment>
    휴먼계정으로 전환된 이 고객의 정보는{' '}
    <Link className="c-point2 td-none" to="/admin/account/users">
      {' '}
      계정/고객계정
    </Link>{' '}
    에서 확인하실 수 있습니다.
  </React.Fragment>
);

export const endServiceMessageD = (
  <React.Fragment>
    휴먼계정으로 전환된 후에 이전의 식수량 변경을 원하실 경우 : <br />
    고객 계정을 활성화 &#8201;&#8594;&#8201;&#8201;
    <Link className="c-point2 td-none" to="/admin/count/catering/dd">
      식수현황/위탁급식식수
    </Link>{' '}
    에서 변경&#8201;&#8201;&#8594;&#8201;&#8201;
    <span className="c-point2">인보이스 재발행</span>
    <br />
    &#8201;&#8201;&#8594;&#8201;&#8201; 다시 휴먼계정으로 전환
  </React.Fragment>
);

export const endServiceMessageB = (
  <React.Fragment>
    고객의 서비스를 다시 활성화 시키시려면,&#8201;&#8201; &#39;서비스종료&#39;
    &#8201;&#8201;체크박스를 해지하고 <br />
    저장버튼을 클릭해주세요&#44;
  </React.Fragment>
);

export const restoSalesMsg = (
  <div className="notice">
    <p className="pb3 b">- &#8201;식사 시간&#8201; &#45;</p>
    <p className="pb3 b">
      중식 &#58;&#8201;&#8201; 11 시 30 분 &#126; 13 시 30 분<br />
      석식 &#58;&#8201;&#8201; 16 시 30 분 &#126; 18 시 00 분<br />
    </p>
    <p className="f-mini">
      &#42; 중식. 석식 <span className="c-point2">매출 총액</span>을
      입력해주세요&#46; <br />
      &#42; 지난 일자에 대한 매출액 변경은 이전 달 까지만 가능합니다&#46; <br />
    </p>
  </div>
);
