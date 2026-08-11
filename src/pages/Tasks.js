import React, { useState } from 'react';
import FormField from '../components/FormField';
import SubmitButton from '../components/SubmitButton';
import './Page.css';

function Tasks() {
  const [items, setItems] = useState([
    { text: 'Review inbox', done: false },
    { text: 'Update docs', done: true },
    { text: 'Ship patch', done: false },
  ]);
  const [draft, setDraft] = useState('');
  const [filter, setFilter] = useState('all');

  function addItem(e) {
    e.preventDefault();
    if (!draft.trim()) return;
    items.push({ text: draft.trim(), done: false });
    setItems(items.slice());
    setDraft('');
  }

  function toggleItem(index) {
    items[index].done = !items[index].done;
    setItems(items);
  }

  function removeItem(index) {
    setItems(items.filter(function (_, i) {
      return i !== index;
    }));
  }

  function moveUp(index) {
    if (index === 0) return;
    var next = items.slice();
    var tmp = next[index - 1];
    next[index - 1] = next[index];
    next[index] = tmp;
    setItems(next);
  }

  var visible = items.filter(function (item) {
    if (filter === 'done') return item.done;
    if (filter === 'open') return !item.done;
    return true;
  });

  return (
    <div className="page">
      <h2>Tasks</h2>
      <p className="page-description">
        Keep a short list of things to do. Mark items complete or reorder them.
      </p>

      <div className="filter-row">
        <button
          type="button"
          className={'btn btn-small ' + (filter === 'all' ? 'btn-primary' : 'btn-secondary')}
          onClick={function () { setFilter('all'); }}
        >
          All
        </button>
        <button
          type="button"
          className={'btn btn-small ' + (filter === 'open' ? 'btn-primary' : 'btn-secondary')}
          onClick={function () { setFilter('open'); }}
        >
          Open
        </button>
        <button
          type="button"
          className={'btn btn-small ' + (filter === 'done' ? 'btn-primary' : 'btn-secondary')}
          onClick={function () { setFilter('done'); }}
        >
          Done
        </button>
      </div>

      <form className="page-form" onSubmit={addItem}>
        <FormField
          label="New task"
          id="taskDraft"
          value={draft}
          onChange={function (e) { setDraft(e.target.value); }}
          placeholder="What needs doing?"
        />
        <div className="form-actions">
          <SubmitButton label="Add Task" />
        </div>
      </form>

      <ul className="item-list">
        {visible.map(function (item, index) {
          return (
            <li key={index} className={item.done ? 'item-done' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={function () { toggleItem(items.indexOf(item)); }}
                />
                <span>{item.text}</span>
              </label>
              <span className="item-actions">
                <button type="button" className="btn btn-secondary btn-small" onClick={function () { moveUp(items.indexOf(item)); }}>
                  Up
                </button>
                <button type="button" className="btn btn-secondary btn-small" onClick={function () { removeItem(items.indexOf(item)); }}>
                  Remove
                </button>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Tasks;
