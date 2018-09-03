import React from 'react';
import { Link } from 'react-router-dom';

const Ul = ({ links }) => (
  <ul className="nav-menu">
    {links &&
      links.map(e => (
        <li>
          <Link className={e.className} key={e.id} to={e.to}>
            {e.name}
          </Link>
        </li>
      ))}
  </ul>
);

export default Ul;
