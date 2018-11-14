import React from 'react';
import { Helmet } from 'react-helmet';
/* --- Components --- */
import Loader from './src/shared/loader';
// import './firebase/firebase';
import './styles/main.scss';
import '../public/favicons/favicon.ico';

const Nav = Loader({
  loader: () => import('./src/components/nav' /* webpackChunkName: 'Nav' */),
});

const App = props => {
  const isHomepage = props.history.location.pathname === '/';

  return (
    <div id="app">
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>위탁급식/식당 유청</title>
        <meta property="og:title" content="위탁급식/식당 유청" />
        <meta
          property="og:description"
          content="착한가격의 집밥, 위탁 급식, 뷔폐 식당, 기업체 각종 행사/ 모임 단체 식사, 경주 전지역 배달, No MSG, 신선한 지역 농산물"
        />
        <meta property="og:type" content="###" />
        <meta property="og:url" content="###" />
        <meta property="og:image" content="./../assets/img/header.jpg" />
        <link type="text/plain" rel="author" href="http://domain/humans.txt" />
        <link type="text/plain" rel="author" href="http://domain/robots.txt" />
      </Helmet>
      {props.children}
      {!isHomepage ? <Nav /> : null}
    </div>
  );
};

export default App;
