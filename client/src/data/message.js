import React from 'react';
import { Link } from 'react-router-dom';
/* --- Components --- */
import { admin } from './data';

export const headerMsgA = (
  <div className="header-text--box">
    <h1>
      <div className="point1 f-en">NO MSG&#33;</div>
      <br />
      오늘도 열심히 일한 당신에게 <br />
      당신만을 위한 <span className="point2">착한 가격의 집밥을</span>
      선물하세요&#46;
    </h1>
  </div>
);

export const headerMsgB = (
  <div className="header-text--box">
    <h1>
      <div className="point1 f-en">위탁급식 전문업체</div>
      <br />
      <div className="point2">가정식 한식뷔페</div>
      공장, 사무실, 회사 연중 중식.석식.야식 배달
    </h1>
    <div className="mt4">
      <a className="header--contact td-none" href="tel:+82-54-745-0999">
        전화문의 및 상담환영
      </a>
    </div>
  </div>
);

export const headerMsgC = (
  <div className="header-text--box-c">
    <h1>
      <div className="point1 f-en">찾아가는 서비스</div>
      <br />
      성당, 교회 각종 행사모임 <span className="point2">출장뷔페</span>
      <div className="mt2 header--price">
        반찬 (6가지)&#8201;&#8201;&#8201;&#8201;&#8201; 6,000 원<br />
        반찬 (8가지)&#8201;&#8201;&#8201;&#8201;&#8201; 8,000 원<br />
        반찬 (10가지)&#8201;&#8201; 10,000 원
      </div>
    </h1>
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

export const adminConfirmMessage = (
  <React.Fragment>
    계속 진행하시려면&#44;&#8201; 보안을 위해&#8201;
    <span className="c-point2">
      {admin.companyName}
      님의 비밀번호
    </span>
    를 입력해주세요&#46;
  </React.Fragment>
);

export const adminConfirmMessageOnDelete = (
  <React.Fragment>
    정말 삭제하시겠습니까?
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

export const ratesPageInfoA = (
  <React.Fragment>
    <span className="c-point2">모든 고객 계정을 보기</span>를 원하신다면 상단의
    페이지 제목 &#8201;
    <span className="c-point2">&#39;고객 계정&#39;</span>
    &#8201;을 클릭해 주세요&#46;
  </React.Fragment>
);

export const ratesPageInfoB = (
  <React.Fragment>
    <span className="c-point2">식수가격 변동</span>은 상단의 메뉴&#8201;&#8201;
    <Link className="c-point2 td-none" to="/admin/account/rates">
      계정/식수가격 페이지
    </Link>
    &#8201; 에서 할 수 있습니다&#46;
  </React.Fragment>
);
