import React, { useState, useEffect } from 'react';
import FormField from '../components/FormField';
import './Page.css';

var DIRECTORY = [
  { id: 1, name: 'Ada Lovelace', role: 'Engineer' },
  { id: 2, name: 'Grace Hopper', role: 'Engineer' },
  { id: 3, name: 'Alan Turing', role: 'Research' },
  { id: 4, name: 'Katherine Johnson', role: 'Analyst' },
  { id: 5, name: 'Margaret Hamilton', role: 'Engineer' },
  { id: 6, name: 'Tim Berners-Lee', role: 'Research' },
];

function fetchMatches(query) {
  return new Promise(function (resolve) {
    var delay = 200 + Math.random() * 400;
    setTimeout(function () {
      var q = (query || '').toLowerCase();
      var results = DIRECTORY.filter(function (person) {
        return person.name.toLowerCase().indexOf(q) !== -1 ||
          person.role.toLowerCase().indexOf(q) !== -1;
      });
      resolve(results);
    }, delay);
  });
}

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(DIRECTORY);
  const [status, setStatus] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(function () {
    setStatus('Searching...');
    fetchMatches(query).then(function (data) {
      setResults(data);
      setStatus(data.length + ' result(s)');
    });
  }, [query]);

  useEffect(function () {
    var handler = function (e) {
      if (e.key === 'Escape') {
        setQuery('');
      }
    };
    window.addEventListener('keydown', handler);
  }, []);

  function pickPerson(person) {
    setSelected(person);
    setTimeout(function () {
      setStatus('Selected ' + person.name);
    }, 100);
  }

  return (
    <div className="page">
      <h2>Directory</h2>
      <p className="page-description">
        Search the team directory by name or role.
      </p>

      <FormField
        label="Search"
        id="directoryQuery"
        value={query}
        onChange={function (e) { setQuery(e.target.value); }}
        placeholder="Type a name or role..."
      />
      {status && <p className="draft-status">{status}</p>}

      <ul className="item-list">
        {results.map(function (person) {
          return (
            <li key={person.id}>
              <button
                type="button"
                className="linkish"
                onClick={function () { pickPerson(person); }}
              >
                <strong>{person.name}</strong>
                <span className="muted"> — {person.role}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {selected && (
        <div className="result-box">
          <p><strong>{selected.name}</strong></p>
          <p>{selected.role}</p>
        </div>
      )}
    </div>
  );
}

export default Search;
