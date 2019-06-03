import React from 'react';

/* --- Components --- */
import * as data from '../../shared/data';
import Ul from '../../shared/ul';

const NavMenu = ({ routerLocation, isLoggedIn, userName }) => {
  const isHomepage = routerLocation === '/';
  const addBorderBottom = isHomepage ? '' : 'bb';

  return (
    <div className={`bt ${addBorderBottom}`}>
      {!isLoggedIn && <Ul anchor={data.navHome} />}
      {isLoggedIn ? (
        userName === 'yuchung' ? (
          <p>yuch nav menu</p>
        ) : (
          <Ul links={data.navClient} />
        )
      ) : null}
    </div>
  );
};

export default NavMenu;
