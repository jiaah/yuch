import React from 'react';
import { Link } from 'react-router-dom';
/* --- Components --- */
import { formatToTimeForm } from '../utils/date';
import { admin, DINNER_MEAL_COUNT_CHANGE_CUTOFF_TIME, LUNCH_MEAL_COUNT_CHANGE_CUTOFF_TIME } from './data';

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
      <a
        className="header--contact td-none"
        href={`tel:${admin.contactNo3Link}`}
      >
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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <span>반찬 (6가지)</span>
            <span>반찬 (8가지)</span>
            <span>반찬 (10가지)</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
            <span>8,000 원</span>
            <span>10,000 원</span>
            <span>12,000 원</span>
          </div>
        </div>
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
      <span className="header--text--point-color">7000원의 행복</span>을
      가지세요&#46;
    </h1>
    <p className="white">* 현금가</p>
  </div>
);

export const bankAccountPageInfoA = (
  <p className="f-mini">
    {admin.companyName} 고객 업체에게&#8201;
    <span className="c-point2">
      등록되어있는 계좌 그룹을 유지하고&#44;&#8201;
    </span>
    &#8201;계좌 정보 변경만 원하시면&#44;&#8199;
    <span className="c-point2">계좌를 수정 해주세요&#46;</span>
  </p>
);

export const bankAccountPageInfoB = (
  <p className="f-mini">
    <span className="c-point2">새로운 계좌 등록 혹은 삭제 시&#44;</span>
    &#8199;
    <Link className="td-none c-text2" to="/admin/account/users">
      &#39;고객관리 &#62; 고객계정&#39;
    </Link>{' '}
    으로 이동하여&#44;&#8199;
    <span className="c-point2">
      반드시 새로운 계좌를 고객 업체에 등록해주세요&#46;
    </span>
  </p>
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

export const updateRateMessageA = (
  <p className="f-mini">
    선택한 달 <span className="c-point2">1일부터</span>
    &#8201; 가격변동이 적용됩니다&#46;
  </p>
);

export const updateRateMessageB = (
  <p className="f-mini">
    <span className="c-point2">지난 달의 식수 가격을 변동</span>할 경우,{' '}
    <span className="c-point2">반드시 인보이스 재발행</span>을 해주세요&#46;
  </p>
);

export const updateRateMessageC = (
  <p className="f-mini">
    인보이스 재발행&#58; 인보이스 &#62; 거래명세서 &#62;{' '}
    <Link className="c-point2 td-none" to="/admin/invoice/users">
      인보이스 재발행 버튼
    </Link>{' '}
    클릭
  </p>
);

export const ratesPageInfo = (
  <p className="f-mini">
    <span className="c-point2">식수가격 변동</span>은 상단의 메뉴&#8201;&#8201;
    <Link className="c-point2 td-none" to="/admin/account/rates">
      &#39;고객관리 &#62; 식수가격&#39;
    </Link>
    &#8201; 에서 할 수 있습니다&#46;
  </p>
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
    <p className="pb3 b">- &#8201;금일 식수변경 가능시간&#8201; &#45;</p>
    <p className="pb3 b">
      중식 &#58;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199; &#126; 금일 {formatToTimeForm(LUNCH_MEAL_COUNT_CHANGE_CUTOFF_TIME)}<br />
      석식/야식 &#58;&#8199;&#8199;&#8201; &#126; 금일 {formatToTimeForm(DINNER_MEAL_COUNT_CHANGE_CUTOFF_TIME)}<br />
    </p>
    <p className="f-mini">
      &#42; 원활한 서비스 제공을 위해 가능한 9시까지 식수 등록을 해주시기 바랍니다.&#46; <br />
      &#42; 변경 가능시간이 지난 후, 변경을 원하시면 {admin.companyName}
      으로 문의해주시기 바랍니다&#46; <br />
      &#42; {admin.companyName}
      식당 이용 고객님은 홈페이지에서 야식을 신청할 수 없습니다. 야식 배달은{' '}
      {admin.companyName}
      으로 문의해주시기 바랍니다&#46;
    </p>
  </div>
);

export const adminCateringMsg = (
  <div className="notice">
    <p className="pb3 b">- &#8201;고객 금일 식수변경 가능시간&#8201; &#45;</p>
    <p className="pb3 b">
      중식 &#58;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199; &#126; 금일 {formatToTimeForm(LUNCH_MEAL_COUNT_CHANGE_CUTOFF_TIME)}<br />
      석식/야식 &#58;&#8199;&#8199;&#8201; &#126; 금일 {formatToTimeForm(DINNER_MEAL_COUNT_CHANGE_CUTOFF_TIME)}<br />
    </p>
    <p className="f-mini">
      &#42; {admin.companyName}
      고객은 상단의 변경가능시간에만 식수변경 가능합니다&#46;
      <br />
      &#42; {admin.companyName}은 지난 일자에 대한 식수변경을 이전 달 1일까지 할
      수 있습니다&#46;
    </p>
    <p className="f-mini pt3">
      &#42; 서비스가 종료된 고객은 반드시 거래명세서와 매출의 오류를
      방지하기위해
      <br />
      <Link className="c-point2 td-none" to="/admin/account/users">
        &#39;고객관리 &#62; 고객계정 &#62; 수정 &#62; 서비스 종료&#39;
      </Link>{' '}
      를 해주세요.
    </p>
    <p className="f-mini pt3">
      &#42; <span className="c-point2">지난 달의 식수변경</span>을 한 경우에는
      반드시 <br />
      <span className="c-point2">
        &#39;인보이스 &#62; 거래명세서 &#62;{' '}
        <Link className="c-point2 td-none" to="/admin/invoice/users">
          인보이스 재발행 버튼
        </Link>{' '}
        클릭&#39;
      </span>{' '}
      을 해주세요&#46;
    </p>
    {/* <p className="f-mini pt3">
      [ 인보이스 재발행하는 방법 ]<br />

    </p> */}
    {/* <p className="f-mini pt3">
      [ <span className="c-point2">휴먼고객</span>의 지난 식수량 변경하는 방법 ]
      <br />
      고객 계정을 활성화 &#8201;&#8594;&#8199;
      <Link className="c-text td-none" to="/admin/count/catering/dd">
        &#39;식수현황 &#62; 위탁급식식수&#39;
      </Link>{' '}
      에서 변경&#8199;&#8594;
      <br />
      <Link className="c-point2 td-none" to="/admin/invoice/users">
        인보이스 재발행
      </Link>
      &#8199;&#8594;&#8199; 다시 휴먼계정으로 전환
    </p> */}
  </div>
);

export const endServiceMessageA = (
  <React.Fragment>
    서비스 종료 일자를 기준으로 저장된 모든{' '}
    <span className="c-point2">위탁급식 식수량이 삭제</span>
    됩니다&#46;
  </React.Fragment>
);

// export const endServiceMessageC = (
//   <React.Fragment>
//     휴먼계정으로 전환된 이 고객의 정보는{' '}
//     <Link className="c-point2 td-none" to="/admin/account/users">
//       {' '}
//       &#39;고객관리 &#62; 고객계정&#39;
//     </Link>{' '}
//     에서 확인하실 수 있습니다.
//   </React.Fragment>
// );

// export const endServiceMessageD = (
//   <React.Fragment>
//     휴먼계정으로 전환된 후에 이전의 식수량 변경을 원하실 경우 : <br />
//     고객 계정을 활성화 &#8201;&#8594;&#8199;
//     <Link className="c-point2 td-none" to="/admin/count/catering/dd">
//       &#39;식수현황 &#62; 위탁급식식수&#39;
//     </Link>{' '}
//     에서 변경&#8199;&#8594;&#8199;
//     <Link className="c-point2 td-none" to="/admin/invoice/users">
//       인보이스 재발행
//     </Link>
//     <br />
//     &#8199;&#8594;&#8199; 다시 휴먼계정으로 전환
//   </React.Fragment>
// );

export const endServiceMessageB = (
  <React.Fragment>
    고객의 서비스를 다시 활성화 시키시려면,&#8201; &#39;서비스종료&#39; &#8201;
    체크박스를 <br />
    해지하고 저장버튼을 클릭해주세요&#44;
  </React.Fragment>
);

export const restoSalesMsg = (
  <div className="notice">
    <p className="pb3 b">- &#8201;식사 시간&#8201; &#45;</p>
    <p className="pb3 b">
      중식 &#58;&#8199; 11 시 30 분 &#126; 13 시 30 분<br />
      석식 &#58;&#8199; 16 시 30 분 &#126; 18 시 00 분<br />
    </p>
    <p className="f-mini">
      &#42;{' '}
      <span className="c-point2">
        식당 식수에 등록하는 고객 매출을 제외한{' '}
        <span className="b">매출 총액</span>
      </span>
      을 입력 해주세요&#46; <br />
      &#42; 식당 식수에 등록하는 고객에 대한 매출액은 식당매출에 포함됩니다.
      {/* <br />
      &#42; 지난 일자에 대한 매출액 변경은 이전 달 까지만 가능합니다&#46; <br /> */}
    </p>
    {/* <p className="f-mini">
      &#42; <span className="c-point2">지난 달의 매출을 변경</span> 한 경우에는{' '}
      <span className="c-point2">반드시 매출 재발행</span>를 해주세요&#46;
    </p>
    <p className="f-mini pt3">
      [ 매출 재발행하는 방법 ]<br /> &#39;인보이스 &#62; 거래명세서&#39;
      &#8201;&#8594;&#8199;
      <Link className="c-point2 td-none" to="/admin/invoice/users">
        &#39;인보이스&#39;&#8201; 재발행 버튼
      </Link>{' '}
      클릭
    </p> */}
  </div>
);

export const editUserAccountMsg = (
  <p className="f-mini">
    &#8201;비지니스 타입 변경은 불가능합니다. 새로운 계정을 생성하여주세요&#46;
    <br />
    &#40; 동일한 업체명&#44; 아이디&#44; 이메일 사용불가 &#41;
  </p>
);

export const endOfServiceMegInEditForm = (
  <React.Fragment>
    &#91;&#8201;서비스 종료 설정&#8201;&#93;&#8199;지정된 일자로부터 저장된{' '}
    <br />
    모든 식수량이 삭제됩니다&#46;
  </React.Fragment>
);

export const userSpecialMealNotice = (
  <div className="notice">
    <p className="pb3 b">- &#8201;가격&#8201; &#45;</p>
    <p className="pb3 b">
      반찬 &#40;6가지&#41;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;6&#44;000 원{' '}
      <br />
      반찬 &#40;8가지&#41;&#8199;&#8199;&#8199;&#8199;&#8199;&#8199;8&#44;000 원{' '}
      <br />
      반찬 &#40;10가지&#41;&#8199;&#8199;&#8199;&#8199;10&#44;000 원
    </p>
    <p className="f-mini">
      &#42; <span className="c-point2">각종 행사 모임 출장 뷔폐</span>
      <br />
      &#42; 특식의 반찬수와 가격은 조정가능합니다&#46; <br />
      &#42; 특식 신청 또는 변경을 원하시면 유청에{' '}
      <span className="c-point2">전화문의</span> 주시기 바랍니다&#46;
      <br />
      &#42; 월말 거래명세서에 포함되는 특식만 리스트에 보입니다. 별개로
      정산하신다면 시스템에 등록되지 않습니다.
    </p>
  </div>
);

export const adminSpecialMealMsg = (
  <p>
    <span className="c-point2">
      고객사가 등록된 특식 내역은 고객사가 볼 수 있으며
    </span>
    , 월말 거래 명세서에는 포함되지 않습니다&#46;
  </p>
);

// export const adminSpecialMealMsgC = (
//   <p className="f-mini">
//     <span className="c-point2">지난 달의 특식을 변동</span>한 경우,{' '}
//     <span className="c-point2">반드시 인보이스 재발행</span>을 해주세요&#46;
//   </p>
// );

// export const adminInvoiceMsg = (
//   <p className="f-mini">
//     <span className="c-point2">
//       <span className="b">지난 달</span>의 식수 or 식수가격을 변경
//     </span>
//     한 경우에는 <br />
//     <span className="b c-point2">반드시</span> 우측 상단의
//     <span className="c-point2">
//       &#8201;&#39;인보이스&#39;&#8199;
//       <span className="b">재발행 버튼</span>
//       &#8201;
//     </span>
//     을 클릭하세요&#46;
//   </p>
// );
