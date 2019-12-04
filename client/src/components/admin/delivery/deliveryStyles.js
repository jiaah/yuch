const drawerWidth = 500;

export const styles = theme => ({
  root: {
    display: 'flex',
  },
  // Drawer
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
    zIndex: '1',
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
  // Main
  content: {
    flexGrow: 1,
  },
});
