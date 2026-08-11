import React from 'react';
import ReactDOM from 'react-dom';
import FormField from '../components/FormField';
import SubmitButton from '../components/SubmitButton';
import './Page.css';

class PanelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  componentDidCatch(error) {
    this.setState({ hasError: true, message: error.message });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="result-box">
          <p><strong>Something went wrong in this panel.</strong></p>
          <p>{this.state.message}</p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={function () { this.setState({ hasError: false, message: '' }); }.bind(this)}
          >
            Dismiss
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function HelpPortal({ open, onClose, children }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div className="help-overlay" onClick={onClose}>
      <div className="help-modal" onClick={function (e) { e.stopPropagation(); }}>
        {children}
        <button type="button" className="btn btn-primary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.body
  );
}

class StatsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicks: props.seed || 0 };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.seed !== this.props.seed) {
      this.setState({ clicks: this.props.seed });
    }
  }

  render() {
    if (this.props.forceFail) {
      throw new Error('Stats panel failed to load');
    }
    return (
      <div className="result-box">
        <p><strong>Session clicks</strong></p>
        <p>{this.state.clicks}</p>
        <button
          type="button"
          className="btn btn-secondary btn-small"
          onClick={function () {
            this.setState({ clicks: this.state.clicks + 1 });
          }.bind(this)}
        >
          Register click
        </button>
      </div>
    );
  }
}

class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: '',
      open: false,
      seed: 0,
      forceFail: false,
    };
  }

  openHelp = () => {
    this.setState({ open: true });
  };

  closeHelp = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div className="page">
        <h2>Help</h2>
        <p className="page-description">
          Browse help topics or open the quick tips panel.
        </p>

        <form
          className="page-form"
          onSubmit={function (e) {
            e.preventDefault();
            this.openHelp();
          }.bind(this)}
        >
          <FormField
            label="Topic"
            id="helpTopic"
            value={this.state.topic}
            onChange={function (e) { this.setState({ topic: e.target.value }); }.bind(this)}
            placeholder="e.g. Forms, Tasks, Profile"
          />
          <div className="form-actions">
            <SubmitButton label="Open Tips" />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={function () {
                this.setState({ seed: this.state.seed + 1 });
              }.bind(this)}
            >
              Refresh stats
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={function () {
                this.setState({ forceFail: true });
              }.bind(this)}
            >
              Stress test panel
            </button>
          </div>
        </form>

        <PanelErrorBoundary>
          <StatsPanel seed={this.state.seed} forceFail={this.state.forceFail} />
        </PanelErrorBoundary>

        <HelpPortal open={this.state.open} onClose={this.closeHelp}>
          <h3 style={{ marginTop: 0 }}>Quick tips</h3>
          <p>
            {this.state.topic
              ? 'Tips for: ' + this.state.topic
              : 'Pick a topic above, then open tips again for a focused blurb.'}
          </p>
          <p className="muted">
            Use the navigation bar to move between Home, Contact, Profile, and the other tools.
          </p>
        </HelpPortal>
      </div>
    );
  }
}

export default Help;
