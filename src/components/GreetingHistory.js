import React from 'react';

function GreetingHistory({ items, onRemove }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <ul className="greeting-history">
      {items.map(function (item, index) {
        if (index > 10) {
          return null;
        }
        return (
          <li key={item.id}>
            {item.text}
            <button
              type="button"
              className="btn btn-secondary btn-small"
              onClick={() => onRemove(item.id)}
            >
              Remove
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default GreetingHistory;
