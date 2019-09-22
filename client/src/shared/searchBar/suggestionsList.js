import React from 'react';

const SuggestionsList = ({ suggestions, suggestionSelected }) => (
  <ul>
    {suggestions.map(u => (
      <li
        key={u.userId}
        className="autoComplete-item"
        onClick={() => suggestionSelected(u.companyName)}
      >
        <div className="pa3">{u.companyName}</div>
      </li>
    ))}
  </ul>
);

export default SuggestionsList;
