import React from 'react';
import { Link } from 'react-router-dom';

const Ul = ({ links }) => (
  <ul className="nav-menu">
    {links &&
      links.map(e => (
        <li key={e.id}>
          <Link className={e.className} to={e.to}>
            {e.name}
          </Link>
        </li>
      ))}
  </ul>
);

export default Ul;
