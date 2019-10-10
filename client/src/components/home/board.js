import React from 'react';
/* --- Component --- */
import Loader from '../loader';
import Icon from '../../../assets/icons/index';

const Map = Loader({
  loader: () => import('./map' /* webpackChunkName: 'Map' */),
});
class Board extends React.Component {
  constructor() {
    super();
    this.state = { lastScrollY: 0 };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const currentScrollY = window.scrollY;
    this.setState({ lastScrollY: currentScrollY });
  };

  render() {
    return (
      <React.Fragment>
        <div id="board" className="homeboard">
          {this.state.lastScrollY > 1000 && <Map />}
          <div className="homeboard--text tc">
            <div className="mb4">
              <h3 className="c-text1">&#45; Hours &#45;</h3>
              <div className="flex justify-center">
                <p className="mr3 float-left">
                  평일
                  <br />
                  <br />
                  공휴일/주말
                </p>
                <p>
                  중식 &#8201;11&#8201;&#58;&#8201;30 &#45;
                  13&#8201;&#58;&#8201;30
                  <br />
                  석식 &#8201;16&#8201;&#58;&#8201;30 &#45;
                  18&#8201;&#58;&#8201;00
                  <br />
                  중식 &#8201;11&#8201;&#58;&#8201;30 &#45;
                  13&#8201;&#58;&#8201;30
                </p>
              </div>
            </div>
            <div>
              <h3 className="c-text1">&#45; Contact &#45;</h3>
              <p>
                경주시 황성동 1071&#45;1번지
                <br />
                용강공단 내 강남골프장 맞은 편
              </p>
              <br />
              <div className="contact-number">
                <div className="flex justify-center pt3">
                  <Icon
                    name="contact"
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                  />
                  <a
                    className="td-none c-point2"
                    href="tel:+82-10-8034-0057"
                    aria-label="dial a phone call"
                  >
                    054 &#46; &#8201;745&#8200; &#46; 0999
                    <br />
                    010 &#46; 8034 &#46; 0057
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="bt tc ph f-mini f-en">
          &#169; 2019 &#124; All right reserved &#124; YUCH
        </footer>
      </React.Fragment>
    );
  }
}
export default Board;
