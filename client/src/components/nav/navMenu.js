import React from 'react';

/* --- Components --- */
import { Link } from 'react-router-dom';
import * as data from '../../shared/data';
import Ul from '../../shared/ul';

const NavMenu = ({ routerLocation, isLoggedIn, userName }) => {
  const isHomepage = routerLocation === '/';
  const loginPage = routerLocation === '/login';
  const addBorderBottom = isHomepage || loginPage ? '' : 'bb';

  return (
    <div className={`bt ${addBorderBottom}`}>
      {isHomepage && !isLoggedIn && <Ul anchor={data.navHome} />}
      {isLoggedIn ? (
        userName === 'yuchung' ? (
          <Link to="/signup">CREATE USER</Link>
        ) : (
          <Ul links={data.navClient} />
        )
      ) : null}
    </div>
  );
};

export default NavMenu;
