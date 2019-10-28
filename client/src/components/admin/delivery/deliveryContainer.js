import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import DeliveryDrawer from './deliveryDrawer';
/* --- Actions --- */
import * as deliveryActions from '../../../actions/deliveryAction';
import { getUsers } from '../../../actions/adminAccountAction';

const DeliveryContainer = ({
  // state
  selectedSearchItem,
  // actions
  getUsers,
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
      <div>
        <DeliveryDrawer
          getUsers={getUsers}
          selectedSearchItem={selectedSearchItem}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  // clickedUserData: state.selected.data,
  selectedSearchItem: state.selected.value,
  // usersStatus: state.selected.users,
});

const mapDispatchToProps = dispatch => ({
  deliveryActions: bindActionCreators(deliveryActions, dispatch),
  getUsers: () => dispatch(getUsers()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeliveryContainer);
