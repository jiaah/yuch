import React from 'react';
import { connect } from 'react-redux';

import { count } from '../actions/example';
/* eslint no-console: 0 */
class User extends React.Component {
  handleButtonClick = async () => {
    await this.props.onCount();
    return 10;
  };

  render() {
    // let exam: string = 'LEE';
    // exam = 2;
    return (
      <div className="user-page">
        <h1>Welcome to User</h1>
        <h2>Counting: {this.props.counting}</h2>
        <button type="button" onClick={this.handleButtonClick}>
          Click
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  counting: state.test.counting,
});

const mapDispatchToProps = dispatch => ({
  onCount: () => dispatch(count()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(User);
