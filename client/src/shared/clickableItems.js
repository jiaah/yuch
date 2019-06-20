import React from 'react';

const ClickableItems = ({ suggestions, suggestionSelected }) => (
  <ul>
    {suggestions.map(u => (
      <li key={u.id} onClick={() => suggestionSelected(u.companyName)}>
        {u.companyName}
      </li>
    ))}
  </ul>
);

export default ClickableItems;
