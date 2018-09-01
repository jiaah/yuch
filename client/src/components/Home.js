import React from 'react';
/* --- Shared --- */
import Nav from '../shared/nav';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <header>
          <h2>
            NO MSG <br />
            힘들게 일한 당신께 착한 가격의 집밥을 선물하세요.
          </h2>
        </header>
      </div>
    );
  }
}

export default Home;
