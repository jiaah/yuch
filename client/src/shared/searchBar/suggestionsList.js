import React from 'react';

const SuggestionsList = ({
  suggestions,
  suggestionSelected,
  searchingProp,
}) => (
  <ul>
    {suggestions.map(u => (
      <li
        key={u[searchingProp]}
        className="autoComplete-item"
        onClick={() => suggestionSelected(u)}
      >
        <div className="pa3">{u[searchingProp]}</div>
      </li>
    ))}
  </ul>
);

export default SuggestionsList;
