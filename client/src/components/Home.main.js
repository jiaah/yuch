import React from 'react';
/* --- Images --- */
import delivery from '../../assets/img/delivery.jpeg';
import localfood from '../../assets/img/localfood.jpeg';
import sesame from '../../assets/img/sesame.jpeg';
import women from '../../assets/img/women.jpeg';

const HomeMain = () => (
  <div className="home-main--container">
    <div className="home-main--box">
      <div className="home-main--img">
        <img src={delivery} alt="신선한 음식 배달" />
      </div>
      <div className="home-main--text">
        <h3>유청 서비스</h3>
        <div className="mb3">
          <h4>위탁급식</h4>
          <p>
            기업계, 각종 행사 모임
            <br />
            연증 중식, 석식, 야식 배달
          </p>
        </div>
        <div>
          <h4>식당</h4>
          <p>중식, 석식 뷔폐 서비스</p>
        </div>
      </div>
    </div>
    <div className="home-main--box reverse">
      <div className="home-main--img">
        <img src={localfood} alt="지역 농산품" />
      </div>
      <div className="home-main--text">
        <h3>지역 농산품</h3>
        <p>
          경주 지역민들의 밭에서 공수해온 농산품들을 주재료로 사용합니다&#46;
        </p>
      </div>
    </div>
    <div className="home-main--box">
      <div className="home-main--img">
        <img src={sesame} alt="참기름" />
      </div>
      <div className="home-main--text">
        <h3>
          경주시 지원사업
          <br />
          100&#37; 통참깨 참기름 사용
        </h3>
        <p>
          경주 지역민들의 밭에서 공수해온 농산품들을 주재료로 사용합니다&#46;
        </p>
      </div>
    </div>
    <div className="home-main--box reverse">
      <div className="home-main--img">
        <img src={women} alt="여성을 위한 기업" />
      </div>
      <div className="home-main--text">
        <h3>여성이 일하기 좋은 기업</h3>
        <p>
          2016년 여성이 일하기 좋은 기업으로 선정&#46;
          <br />
          유청은 나이와 국적에 제한을 두지 않고 채용합니다&#46;
        </p>
      </div>
    </div>
  </div>
);

export default HomeMain;
