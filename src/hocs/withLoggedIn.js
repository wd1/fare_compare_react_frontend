import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../actions';

const withLoggedIn = WrappedComponent => {
  class LoggedInComponent extends React.Component {

    render() {
      if (localStorage.getItem('token')) {
        return <Redirect to="/profile" />
      } else {
        return <WrappedComponent {...this.props} />;
      }
    }
  }

  return connect(null, actions)(LoggedInComponent);
};

export default withLoggedIn;
