import React from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import withLoggedIn from '../../hocs/withLoggedIn';
import NavBar from '../common/NavBar';
import * as actions from '../../actions';
import {renderComponents} from '../../services/renderComponents';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {
        email: '',
        password: '',
        passwordConfirmation: ''
      }
    };
  }

  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { fields: { email, password, passwordConfirmation } } = this.state;
    this.props.signupUser(email, password, passwordConfirmation, this.props.history);
  };

  render() {
    // console.log(this.props)
    const { fields } = this.state;
    const {emailComponent, passwordComponent, passwordConfirmationComponent} = renderComponents.auth
    const {error} = this.props

    return (
      <div id="auth">
        <NavBar />

        <div className="ui center aligned inverted segment container" id="auth-box">

          <div className="ui centered header">
            <h1 className="font">Create Account</h1>
          </div>

          <form className="ui form" onSubmit={this.handleSubmit}>
            {emailComponent(fields.email, this.handleChange)}
            {passwordComponent(fields.password, this.handleChange)}
            {passwordConfirmationComponent(fields.passwordConfirmation, this.handleChange)}

            <div className="one ui buttons">
              <button className="ui grey large button">Create Account</button>
            </div>
          </form>
        </div>

        {error ? <div className="ui center aligned inverted segment container" id="error-box">
          <h2 id="error-h2">{error}</h2>
        </div> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.currentUser.error
});

export default withLoggedIn(withRouter(connect(mapStateToProps, actions)(Signup)));
//
// export default withRouter(withAuth(Login));
