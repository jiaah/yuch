import React from 'react';
import { Link } from 'react-router-dom';

const Ul = ({ links, info }) => (
  <ul className="nav-menu">
    {links &&
      links.map(e => (
        <Link className={e.className} key={e.id} to={e.to}>
          {e.name}
        </Link>
      ))}
  </ul>
);

export default Ul;
