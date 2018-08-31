import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
  <div>
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/user">User</NavLink>
        </li>
      </ul>
    </nav>
  </div>
);

export default Nav;
