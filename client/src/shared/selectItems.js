import React from 'react';

const SelectItems = ({ suggestions, suggestionSelected }) => (
  <ul>
    {suggestions.map(u => (
      <li key={u.id} onClick={() => suggestionSelected(u.companyName)}>
        {u.companyName}
      </li>
    ))}
  </ul>
);

export default SelectItems;
