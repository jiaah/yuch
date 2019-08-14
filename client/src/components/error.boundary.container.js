/* eslint-disable no-console */
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    console.log(this.state.error && this.state.error.toString());
    console.log(this.state.errorInfo.componentStack);
    if (this.state.errorInfo) {
      return (
        <div className="error--container">
          <div id="notfound">
            <div className="notfound">
              <div className="notfound-404">
                <h1>Oops!</h1>
                <h2>500 - 시스템 오류입니다.</h2>
              </div>
              <a href="/">Go TO Homepage</a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
