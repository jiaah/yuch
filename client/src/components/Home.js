import React from 'react';
import MarkdownData from '../../../data/post.md';
import Image from '../../assets/img/background.jpeg';
import Svg from '../../assets/svg/react.svg';
import data from '../../../data/data.js';

const getBundle = () => {
  import(/* webpackChunkName: 'lodash' */ 'lodash').then(() =>
    // eslint-disable-next-line no-console
    console.log('imported'),
  );
};
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };
  }

  climb() {
    const { count } = this.state;
    this.setState({
      count: count + 1,
    });
  }

  render() {
    /* JS COMMENT */
    const { count } = this.state;
    const { heading } = data;
    return (
      <div className="home-page">
        <img className="image" src={Image} alt="img" />
        <h1 onClick={getBundle}>{heading}</h1>
        <div onClick={this.climb.bind(this)}>
          <h2>
            {MarkdownData.title} {count}
          </h2>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: MarkdownData.__content }} />
        </div>
        <img className="svg-image" src={Svg} alt="img" />
      </div>
    );
  }
}
