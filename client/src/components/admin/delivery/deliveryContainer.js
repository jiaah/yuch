import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
/* --- Actions --- */
import * as deliveryActions from '../../../actions/deliveryAction';

const DeliveryContainer = ({
  deliveryActions: { getRoutes, createRoute, deleteRoute },
}) => {
  const [state, setState] = useState({ routes: null });

  const fetchData = async () => {
    const routes = await getRoutes();
    setState({ ...state, routes });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-a r--w-50">
      <h2>위탁급식 배달 루트</h2>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  deliveryActions: bindActionCreators(deliveryActions, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(DeliveryContainer);
