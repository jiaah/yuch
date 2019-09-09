import React from 'react';
import loading from '../../assets/img/loading.gif';

const Loading = () => (
  <div className="loading-img--container">
    <img className="loading-img" src={loading} alt="loading..." />
  </div>
);

export default Loading;
