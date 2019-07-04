import React from 'react';

/* --- Components --- */
import Ul from '../../shared/ul';
import ToggleMenuList from './toggleMenuList';

const NavMenu = ({ routerLocation, isLoggedIn, data, isAdmin }) => {
  const isHomepage = routerLocation === '/';
  const loginPage = routerLocation === '/login';
  const addBorderBottom = isHomepage || loginPage ? '' : 'bb';

  return (
    <div className={`bt ${addBorderBottom}`}>
      {isHomepage && !isLoggedIn && <Ul anchor={data.navHome} />}
      {isLoggedIn ? (
        isAdmin ? (
          <ToggleMenuList
            navAdminList={data.navAdminList}
            navAdminItems={data.navAdminItems}
          />
        ) : (
          <Ul links={data.navClient} />
        )
      ) : null}
    </div>
  );
};

export default NavMenu;
