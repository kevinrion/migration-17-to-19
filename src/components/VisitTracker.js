import React from 'react';
import PropTypes from 'prop-types';

class VisitTracker extends React.Component {
  componentDidMount() {
    this.context.incrementVisit();
  }

  render() {
    return (
      <span className="visit-tracker">
        {this.context.appLabel} — visits: {this.context.visitCount}
      </span>
    );
  }
}

VisitTracker.contextTypes = {
  visitCount: PropTypes.number,
  appLabel: PropTypes.string,
  incrementVisit: PropTypes.func,
};

export default VisitTracker;
