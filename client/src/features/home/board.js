import React from 'react';
import Map from './map';

const Board = () => (
  <React.Fragment>
    <div id="board" className="homeboard">
      <Map />
      <div className="homeboard--text">
        <div className="mb4">
          <h3 className="tc">&#45; Hours &#45;</h3>
          <div className="flex justify-center">
            <p className="mr3 float-left">
              평일
              <br />
              <br />
              공휴일/주말
            </p>
            <p>
              중식 &#8201;11&#8201;&#58;&#8201;30 &#45; 13&#8201;&#58;&#8201;30
              <br />
              석식 &#8201;16&#8201;&#58;&#8201;30 &#45; 18&#8201;&#58;&#8201;00
              <br />
              중식 &#8201;11&#8201;&#58;&#8201;30 &#45; 13&#8201;&#58;&#8201;30
            </p>
          </div>
        </div>
        <div className="tc">
          <h3>&#45; Contact &#45;</h3>
          <p>
            경주시 황성동 1071&#45;1번지
            <br />
            홈플러스 근처 공단 안<br />
            강남골프장 맞은 편
          </p>
          <br />
          <a className="td-none c-point2 b" href="tel:+82-10-8034-0057">
            054 &#46; 745 &#46; 0999
            <br />
            010 &#46; 8034 &#46; 0057
          </a>
        </div>
      </div>
    </div>
    <footer className="bt tc ph f-mini f-en">
      &#169; 2018 &#124; All right reserved &#124; YUCH
    </footer>
  </React.Fragment>
);
export default Board;
