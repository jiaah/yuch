import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
/* --- Components --- */
import DeliveryDrawer from './deliveryDrawer';
import DeliveryMain from './deliveryMain';
/* --- Actions --- */
import * as deliveryActions from '../../../actions/deliveryAction';
import { getUsers } from '../../../actions/adminAccountAction';

const drawerWidth = 500;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    height: 'calc(100% - 161px)',
    top: 161,
    [theme.breakpoints.up('md')]: {
      height: 'calc(100% - 170px)',
      top: 170,
    },
    [theme.breakpoints.up('lg')]: {
      height: 'calc(100% - 190px)',
      top: 190,
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    overflowY: 'scroll',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'scroll',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: 200,
    [theme.breakpoints.up('sm')]: {
      width: 240,
    },
    overflowX: 'hidden',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(1, 1, 0, 1),
    height: 40,
  },
  listItemA: { width: 250 },
  content: {
    flexGrow: 1,
  },
});

const DeliveryContainer = ({
  classes,
  // state
  selectedSearchItem,
  // actions
  getUsers,
  deliveryActions,
}) => {
  const fetchData = async () => {
    const routes = await deliveryActions.getRoutes();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-a">
      <div className={classes.root}>
        <DeliveryDrawer
          getUsers={getUsers}
          selectedSearchItem={selectedSearchItem}
          classes={classes}
        />
        <DeliveryMain classes={classes} deliveryActions={deliveryActions} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  selectedSearchItem: state.selected.value,
});

const mapDispatchToProps = dispatch => ({
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
