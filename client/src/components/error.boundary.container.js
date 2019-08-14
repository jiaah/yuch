/* eslint-disable no-console */
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    console.log('this.state.hasError: ', this.state.hasError);
    if (this.state.hasError) {
      return (
        <div className="error--container">
          <a
            href="https://www.clipart.email/download/361468.html"
            title="Image from clipart.email"
          >
            <img
              src="https://cdn.clipart.email/06b868cb5a845be9120c2f36783a6d83_error-vector-clip-art-royalty-free-13922-error-clipart-vector-_200-194.jpeg"
              width="350"
              alt="Human Error Clipart"
            />
          </a>
          <div className="tc f-regular lh-1 error--p">
            <div className="f-xl lh-1 error--p-1">
              <p className="main-blue">Oops !</p>
              <p className="main-blue">시스템 오류입니다.</p>
            </div>
            <div className="mt4 fw3 error--p-2">
              <p>브라우저를 새로고침하거나 나중에 다시 시도해주세요.</p>
            </div>
            <button type="button" to="/">
              메인페이지로 바로가기
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
