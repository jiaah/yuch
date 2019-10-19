/* eslint-disable no-console */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bugReport } from '../actions/mailAction';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      errorInfo: null,
      msg: '',
    };
  }

  componentDidCatch = async (error, errorInfo) => {
    this.setState({
      error,
      errorInfo,
    });

    const errorMsg = error.toString();
    const errorInfoMsg = errorInfo.componentStack;
    if (errorInfo && process.env.NODE_ENV === 'production') {
      const res = await this.props.bugReport(errorMsg, errorInfoMsg);
      if (!res.error) {
        this.setState({
          msg: '오류가 관리자에게 보고되었습니다.',
        });
      }
    }
  };

  render() {
    const { errorInfo, error, msg } = this.state;
    if (errorInfo) {
      return (
        <div id="notfound">
          <div className="notfound">
            <div className="notfound-404">
              <h1>Oops!</h1>
              <h2>500 - 시스템 오류입니다.</h2>
            </div>
            {msg}
            <details style={{ whiteSpace: 'pre-wrap' }} className="mb2">
              {error && error.toString()}
              <br />
              {errorInfo.componentStack}
            </details>
            <a href="/">Go TO Homepage</a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const mapDispatchToProps = dispatch => ({
  bugReport: (error, errorInfo) => dispatch(bugReport(error, errorInfo)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ErrorBoundary);
