import React from 'react';
/* --- Components --- */
import * as data from '../../shared/data';
import Ul from '../../shared/ul';

const NavMenu = ({ routerLocation }) => {
  const isHomepage = routerLocation === '/';
  const addBorderBottom = isHomepage ? '' : 'bb';

  return (
    <div className={`bt ${addBorderBottom}`}>
      <Ul anchor={data.nav} />
    </div>
  );
};

export default NavMenu;
