import React from 'react';
import Loadable from 'react-loadable';

const Spinner = () =>
  import('../components/spinner' /* webpackChunkName: 'Spinner' */);

const Loading = props => {
  if (props.error) {
    return (
      <div>
        Routing Error!
        <button type="button" onClick={props.retry}>
          Retry
        </button>
      </div>
    );
  }
  if (props.timedOut) {
    return (
      <div>
        Taking a long time...
        <button type="button" onClick={props.retry}>
          Retry
        </button>
      </div>
    );
  }
  if (props.pastDelay) {
    Spinner();
  }
  return null;
};

const Loader = opts =>
  Loadable(
    Object.assign(
      {
        loading: Loading,
        delay: 200,
        timeout: 10000,
      },
      opts,
    ),
  );

export default Loader;
