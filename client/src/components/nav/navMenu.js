import React from 'react';
import { Link, withRouter } from 'react-router-dom';
/* --- Components --- */
import * as data from '../../shared/data';
import Ul from '../../shared/ul';

const NavMenu = ({ history }) => {
  const isHomepage = history.location.pathname === '/';
  const addBorderBottom = isHomepage ? '' : 'bb';

  return (
    <div className={`bt ${addBorderBottom}`}>
      <Ul anchor={data.nav} />
    </div>
  );
};

export default withRouter(NavMenu);
