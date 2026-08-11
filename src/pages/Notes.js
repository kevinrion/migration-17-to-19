import React from 'react';
import FormField from '../components/FormField';
import SubmitButton from '../components/SubmitButton';
import './Page.css';

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      notes: [],
      filter: props.initialFilter || 'all',
      preview: '',
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.initialFilter && props.initialFilter !== state.filter) {
      return { filter: props.initialFilter };
    }
    return null;
  }

  componentDidMount() {
    var saved = localStorage.getItem('notesBoard');
    if (saved) {
      this.setState({ notes: JSON.parse(saved) });
    }
    this._timer = setInterval(function () {
      document.body.dataset.notesAlive = String(Date.now());
    }, 5000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.notes !== this.state.notes) {
      localStorage.setItem('notesBoard', JSON.stringify(this.state.notes));
    }
    if (prevState.title !== this.state.title || prevState.body !== this.state.body) {
      this.setState({
        preview: (this.state.title || 'Untitled') + ': ' + (this.state.body || '').slice(0, 40),
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    this.setState({ [name]: value });
  };

  handleSave = (e) => {
    e.preventDefault();
    var entry = {
      title: this.state.title || 'Untitled',
      body: this.state.body,
      pinned: false,
      createdAt: Date.now(),
    };
    var notes = this.state.notes.concat([entry]);
    this.setState({ notes: notes, title: '', body: '' });
  };

  togglePin = (index) => {
    var notes = this.state.notes;
    notes[index].pinned = !notes[index].pinned;
    this.setState({ notes: notes });
  };

  render() {
    var filter = this.state.filter;
    var list = this.state.notes.filter(function (note) {
      if (filter === 'pinned') return note.pinned;
      return true;
    });

    return (
      <div className="page">
        <h2>Notes</h2>
        <p className="page-description">
          Jot down quick notes and pin the ones that matter.
        </p>
        {this.state.preview && (
          <p className="draft-status">Preview: {this.state.preview}</p>
        )}

        <form className="page-form" onSubmit={this.handleSave}>
          <FormField
            label="Title"
            id="title"
            value={this.state.title}
            onChange={this.handleChange}
            placeholder="Note title"
          />
          <FormField
            label="Body"
            id="body"
            type="textarea"
            value={this.state.body}
            onChange={this.handleChange}
            placeholder="Write something..."
            rows={4}
          />
          <div className="form-actions">
            <SubmitButton label="Save Note" />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={function () {
                this.setState({ filter: this.state.filter === 'pinned' ? 'all' : 'pinned' });
              }.bind(this)}
            >
              {this.state.filter === 'pinned' ? 'Show all' : 'Show pinned'}
            </button>
          </div>
        </form>

        <ul className="item-list">
          {list.map(function (note, index) {
            return (
              <li key={index}>
                <div>
                  <strong>{note.title}</strong>
                  {note.pinned ? ' ★' : ''}
                  <p className="muted">{note.body}</p>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary btn-small"
                  onClick={function () { this.togglePin(index); }.bind(this)}
                >
                  {note.pinned ? 'Unpin' : 'Pin'}
                </button>
              </li>
            );
          }.bind(this))}
        </ul>
      </div>
    );
  }
}

export default Notes;
