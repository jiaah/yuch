import React from 'react';

const SuggestionsList = ({ suggestions, suggestionSelected }) => (
  <ul className="pa3">
    {suggestions.map(u => (
      <li key={u.id} onClick={() => suggestionSelected(u.companyName)}>
        {u.companyName}
      </li>
    ))}
  </ul>
);

export default SuggestionsList;
