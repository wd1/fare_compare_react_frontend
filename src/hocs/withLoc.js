import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../actions';

const withLoc = WrappedComponent => {
  class LocComponent extends React.Component {

    render() {
      if (localStorage.getItem('destination') && localStorage.getItem('source')) {
        return <WrappedComponent {...this.props} />
      } else {
        return <Redirect to="/search" />;
      }
    }
  }

  return connect(null, actions)(LocComponent);
};

export default withLoc;
