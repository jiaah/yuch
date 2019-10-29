import React, { useEffect, useState } from 'react';
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
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 168px)',
      top: 168,
    },
    [theme.breakpoints.up('md')]: {
      height: 'calc(100% - 185px)',
      top: 185,
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
    padding: theme.spacing(0, 1),
    height: 40,
  },
  listItemA: { width: 250 },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

const DeliveryContainer = ({
  classes,
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
      <div className={classes.root}>
        <DeliveryDrawer
          getUsers={getUsers}
          selectedSearchItem={selectedSearchItem}
          classes={classes}
        />
        <DeliveryMain classes={classes} />
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
