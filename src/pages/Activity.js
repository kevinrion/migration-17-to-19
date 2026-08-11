import React, { useState, useMemo, useCallback } from 'react';
import FormField from '../components/FormField';
import './Page.css';

function scoreEvent(item, query) {
  var score = 0;
  var q = (query || '').toLowerCase();
  for (var i = 0; i < 800; i++) {
    score += (item.label.charCodeAt(0) + i) % 7;
  }
  if (q && item.label.toLowerCase().indexOf(q) !== -1) {
    score += 100;
  }
  return score;
}

function ActivityRow({ item, onSelect, highlight }) {
  return (
    <li className={highlight ? 'item-highlight' : ''}>
      <button type="button" className="linkish" onClick={function () { onSelect(item); }}>
        <strong>{item.label}</strong>
        <span className="muted"> — {item.when}</span>
      </button>
    </li>
  );
}

function Activity() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [sort, setSort] = useState('newest');
  const [events] = useState([
    { id: 'a1', label: 'Profile updated', when: '2h ago', ts: 3 },
    { id: 'a2', label: 'Contact message sent', when: '5h ago', ts: 2 },
    { id: 'a3', label: 'Signed in', when: '1d ago', ts: 1 },
    { id: 'a4', label: 'Task completed', when: '3d ago', ts: 0 },
    { id: 'a5', label: 'Note created', when: '4d ago', ts: -1 },
  ]);

  var ranked = events
    .map(function (item) {
      return Object.assign({}, item, { score: scoreEvent(item, query) });
    })
    .sort(function (a, b) {
      if (sort === 'score') return b.score - a.score;
      return b.ts - a.ts;
    });

  var memoHint = useMemo(function () {
    return { sort: sort, count: ranked.length };
  });

  var handleSelect = useCallback(function (item) {
    setSelected(item);
  });

  return (
    <div className="page">
      <h2>Activity</h2>
      <p className="page-description">
        Recent activity across the app. Filter or sort the feed.
      </p>

      <FormField
        label="Filter"
        id="activityQuery"
        value={query}
        onChange={function (e) { setQuery(e.target.value); }}
        placeholder="Filter activity..."
      />

      <div className="filter-row">
        <button
          type="button"
          className={'btn btn-small ' + (sort === 'newest' ? 'btn-primary' : 'btn-secondary')}
          onClick={function () { setSort('newest'); }}
        >
          Newest
        </button>
        <button
          type="button"
          className={'btn btn-small ' + (sort === 'score' ? 'btn-primary' : 'btn-secondary')}
          onClick={function () { setSort('score'); }}
        >
          Relevance
        </button>
      </div>

      <p className="draft-status">
        Showing {memoHint.count} · sorted by {memoHint.sort}
      </p>

      <ul className="item-list">
        {ranked.map(function (item) {
          return (
            <ActivityRow
              key={item.id}
              item={item}
              highlight={selected && selected.id === item.id}
              onSelect={handleSelect}
              style={{ padding: 4 }}
            />
          );
        })}
      </ul>

      {selected && (
        <div className="result-box">
          <p><strong>{selected.label}</strong></p>
          <p>{selected.when}</p>
        </div>
      )}
    </div>
  );
}

export default Activity;
