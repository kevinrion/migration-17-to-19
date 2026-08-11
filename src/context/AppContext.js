import React from 'react';
import PropTypes from 'prop-types';

class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visitCount: 0,
      appLabel: 'React 17 SPA',
    };
  }

  static childContextTypes = {
    visitCount: PropTypes.number,
    appLabel: PropTypes.string,
    incrementVisit: PropTypes.func,
  };

  getChildContext() {
    return {
      visitCount: this.state.visitCount,
      appLabel: this.state.appLabel,
      incrementVisit: this.incrementVisit.bind(this),
    };
  }

  incrementVisit = () => {
    this.setState({ visitCount: this.state.visitCount + 1 });
  };

  render() {
    return this.props.children;
  }
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
