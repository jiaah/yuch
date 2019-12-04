import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import DeliveryDrawer from './deliveryDrawer';
import DeliveryMain from './deliveryMain';
/* --- Actions --- */
import * as deliveryActions from '../../../actions/deliveryAction';
import { getUsers } from '../../../actions/adminAccountAction';
import { addFlashMessage } from '../../../actions/messageAction';

const mockData = [
  {
    routes: { id: '#1', route: '1route' },
    delivery: [
      { id: '1', companyName: 'user1', address: 'as' },
      { id: '2', companyName: 'user2', address: 'as' },
      { id: '3', companyName: 'user3', address: 'as' },
    ],
  },
  {
    routes: { id: '#2', route: '2route' },
    delivery: [
      { id: '4', companyName: 'user4', address: 'as' },
      { id: '5', companyName: 'user5', address: 'as' },
      { id: '6', companyName: 'user6', address: 'as' },
    ],
  },
  {
    routes: { id: '#3', route: '3route' },
    delivery: [
      { id: '7', companyName: 'user7', address: 'as' },
      { id: '8', companyName: 'user8', address: 'as' },
      { id: '9', companyName: 'user9', address: 'as' },
    ],
  },
];

const DeliveryContainer = ({
  // state
  selectedSearchItem,
  // actions
  addFlashMessage,
  getUsers,
  deliveryActions,
}) => {
  const [data, setData] = useState(null);

  const fetchData = async () =>
    // const res = await deliveryActions.getRoutes();
    // console.log('res: ', res);
    // if (res.error) {
    //   return addFlashMessage('error', '데이터를 가져오는데 실패하였습니다.');
    // }
    setData(mockData);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-a">
      <div className="flex">
        <DeliveryDrawer
          getUsers={getUsers}
          selectedSearchItem={selectedSearchItem}
        />
        <DeliveryMain deliveryActions={deliveryActions} data={data} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeliveryContainer);
