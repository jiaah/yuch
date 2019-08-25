import React from 'react';
/* --- Component --- */
import LazyImage from '../../helpers/lazyImage';
import { admin } from '../../data/data';
/* --- Images --- */
import delivery from '../../../assets/img/delivery.jpg';
import localfood from '../../../assets/img/localfood.jpg';
import sesame from '../../../assets/img/sesame.jpg';
import women from '../../../assets/img/women.jpg';

const HomeMain = () => (
  <div id="home-main" className="home-main--container">
    <div className="home-main--box">
      <img
        className="home-main--img"
        src={delivery}
        alt="신선한 음식 배달"
        data-testid="img-delivery"
      />
      <div className="home-main--text">
        <p className="f-mini lh-3">OUR RESTAURANT</p>
        <h3 className="c-text1">당신의 위한 {admin.companyName} 서비스</h3>
        <div className="mb3">
          <h4 className="b">위탁급식 / 출장뷔페</h4>
          <p>
            공장&#44; 사무실&#44; 회사 위탁급식
            <br />
            성당&#44; 교회&#44; 각종 행사모임 출장뷔페
          </p>
        </div>
        <div>
          <h4 className="b">레스토랑</h4>
          <p>중식&#44; 석식 뷔폐 서비스</p>
        </div>
      </div>
    </div>
    <div className="home-main--box reverse">
      <LazyImage
        classes="home-main--img"
        src={localfood}
        alt="지역 농산품"
        testName="img-localfood"
      />
      <div className="home-main--text">
        <p className="f-mini lh-3">HEALTHY FOOD</p>
        <h3 className="c-text1">신선한 지역 농산물</h3>
        <p>
          지역 농산물 생산 &#183; 가공 &#183; 소비 활성화를 위하여&#44; 경주
          지역민들의 밭에서 공수해온 신선한 농산물들을 주재료로 사용합니다&#46;
        </p>
      </div>
    </div>
    <div className="home-main--box">
      <LazyImage
        classes="home-main--img"
        src={sesame}
        alt="참기름"
        testName="img-sesame"
      />
      <div className="home-main--text">
        <p className="f-mini lh-3">OUR COMMUNITY</p>
        <h3 className="c-text1">
          경주시 지원사업 장려
          <br />
          100&#37; 통참깨 참기름 사용
        </h3>
        <p>
          경주 시니어 클럽에서 주관하는 노인 일자리 창출 사업을 장려하기
          위해&#8201;
          <a
            href="http://www.xn--0z2bz4lsqjfrj.com/"
            rel="noopener noreferrer"
            target="_blank"
            className="sesame-link td-none b"
            data-testid="sesame-link"
          >
            착한손맛
          </a>
          의 참기름을 사용합니다&#46;
        </p>
      </div>
    </div>
    <div className="home-main--box reverse">
      <LazyImage
        classes="home-main--img"
        src={women}
        alt="여성을 위한 기업"
        testName="img-women"
      />
      <div className="home-main--text">
        <p className="f-mini lh-3">CAREER WOMEN</p>
        <h3 className="c-text1">여성이 일하기 좋은 기업</h3>
        <p>
          2016년 여성이 일하기 좋은 기업으로 선정&#46;
          <br />
          {admin.companyName}은 나이와 국적에 제한을 두지 않고 채용합니다&#46;
        </p>
      </div>
    </div>
  </div>
);

export default HomeMain;
