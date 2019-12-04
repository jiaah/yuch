import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import DeliveryDrawer from './deliveryDrawer';
import DeliveryMain from './deliveryMain';
import { styles } from './deliveryStyles';
/* --- Actions --- */
import * as deliveryActions from '../../../actions/deliveryAction';
import { getUsers } from '../../../actions/adminAccountAction';
import { addFlashMessage } from '../../../actions/messageAction';

const mockData = [
  {
    routes: { id: '#1', route: '1route' },
    delivery: [
      { id: '1', companyName: 'user1', address: 'asasdfasdf' },
      { id: '2', companyName: 'user2', address: 'asawfasdfasdf' },
      { id: '3', companyName: 'user3', address: 'aswerwesdf425' },
    ],
  },
  {
    routes: { id: '#2', route: '2route' },
    delivery: [
      { id: '4', companyName: 'user4', address: 'as343' },
      { id: '5', companyName: 'user5', address: 'as34wters' },
      { id: '6', companyName: 'user6', address: 'as24354u65i7yjf' },
    ],
  },
  {
    routes: { id: '#3', route: '3route' },
    delivery: [
      { id: '7', companyName: 'user7', address: 'as34534534534rew' },
      { id: '8', companyName: 'user8', address: 'as345345345345' },
      { id: '9', companyName: 'user9', address: 'aset435er434543' },
    ],
  },
];

const DeliveryContainer = ({
  classes,
  // state
  selectedSearchItem,
  // actions
  addFlashMessage,
  getUsers,
  deliveryActions: { getRoutes, createRoute, deleteRoute },
}) => {
  const [routes, setRoutes] = useState(null);

  const fetchData = async () => {
    const res = await getRoutes();

    if (res.error) {
      return addFlashMessage('error', '데이터를 가져오는데 실패하였습니다.');
    }
    return setRoutes(mockData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-a">
      <div className={classes.root}>
        <DeliveryDrawer
          routes={routes}
          classes={classes}
          getUsers={getUsers}
          selectedSearchItem={selectedSearchItem}
        />
        <DeliveryMain
          data={routes}
          classes={classes}
          createRoute={createRoute}
          deleteRoute={deleteRoute}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  selectedSearchItem: state.selected.value,
});

const mapDispatchToProps = dispatch => ({
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
  deliveryActions: bindActionCreators(deliveryActions, dispatch),
  getUsers: () => dispatch(getUsers()),
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(DeliveryContainer);
