import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => import('./loading' /* webpackChunkName: 'Spinner' */);

const MessageBox = ({ props, msg }) => (
  <div className="error--container">
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
          <h2>{msg}</h2>
        </div>
        <button type="button" onClick={props.retry}>
          Retry
        </button>
      </div>
    </div>
  </div>
);

const isLoading = props => {
  if (props.error) {
    const msg = 'Routing Error!';
    return MessageBox(props, msg);
  }
  if (props.timedOut) {
    const msg = 'Taking a long time...';
    return MessageBox(props, msg);
  }
  if (props.pastDelay) {
    return Loading();
  }
  return null;
};

const Loader = opts =>
  Loadable(
    Object.assign(
      {
        loading: isLoading,
        delay: 200,
        timeout: 10000,
      },
      opts,
    ),
  );

export default Loader;
