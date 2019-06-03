import React from 'react';

/* --- Components --- */
import * as data from '../../shared/data';
import Ul from '../../shared/ul';
import ToggleMenuBox from './toggleMenuBox';

const NavMenu = ({ routerLocation, isLoggedIn, userName }) => {
  const isHomepage = routerLocation === '/';
  const loginPage = routerLocation === '/login';
  const addBorderBottom = isHomepage || loginPage ? '' : 'bb';

  return (
    <div className={`bt ${addBorderBottom}`}>
      {isHomepage && !isLoggedIn && <Ul anchor={data.navHome} />}
      {isLoggedIn ? (
        userName === 'yuchung' ? (
          <ToggleMenuBox links={data.navAdmin} />
        ) : (
          <Ul links={data.navClient} />
        )
      ) : null}
    </div>
  );
};

export default NavMenu;
