import React from 'react';
import { Link } from 'react-router-dom';

const Ul = ({ anchor, links }) => (
  <ul className="nav-menu">
    {links &&
      links.map(e => (
        <li key={e.id}>
          <Link className={e.className} to={e.to}>
            {e.name}
          </Link>
        </li>
      ))}
    {anchor &&
      anchor.map(e => (
        <li key={e.id}>
          <a className={e.className} href={e.to}>
            {e.name}
          </a>
        </li>
      ))}
  </ul>
);

export default Ul;
