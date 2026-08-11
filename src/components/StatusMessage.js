import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class StatusMessage extends React.Component {
  componentDidMount() {
    var node = ReactDOM.findDOMNode(this.refs.host);
    if (node) {
      node.setAttribute('role', 'status');
    }
  }

  render() {
    return (
      <div ref="host" className="status-message">
        {this.props.message}
      </div>
    );
  }
}

StatusMessage.propTypes = {
  message: PropTypes.string,
};

StatusMessage.defaultProps = {
  message: '',
};

export default StatusMessage;
