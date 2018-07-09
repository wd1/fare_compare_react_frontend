import React from 'react';
import {connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const navComponents = (url) => {
  if (url === "/login" || url === "/") {
    return(
      <div className="ui massive inverted stackable container menu" id="navbar-background">
        <div className="item">
          <img src="https://st.depositphotos.com/1518313/4336/v/950/depositphotos_43361649-stock-illustration-circle-rainbow-letter-f.jpg" alt="logo"/>
        </div>
        <a className="item" href="/signup">Sign Up</a>
        <div className="right menu" id="logo-div">
          <h1 id="logo-h1" className="item">Fare Compare</h1>
        </div>
      </div>
    )
  }else if (url === "/signup") {
    return(
      <div className="ui massive inverted stackable container menu" id="navbar-background">
        <div className="item">
          <img src="https://st.depositphotos.com/1518313/4336/v/950/depositphotos_43361649-stock-illustration-circle-rainbow-letter-f.jpg" alt="logo"/>
        </div>
        <a className="item" href="/login">Log In</a>
        <div className="right menu" id="logo-div">
          <h1 id="logo-h1" className="item">Fare Compare</h1>
        </div>
      </div>
    )
  }else if (url === "/reset") {
    return(
      <div className="ui massive inverted stackable container menu" id="navbar-background">
        <div className="item">
          <img src="https://st.depositphotos.com/1518313/4336/v/950/depositphotos_43361649-stock-illustration-circle-rainbow-letter-f.jpg" alt="logo"/>
        </div>
        <a className="item" href="/login">Log In</a>
        <a className="item" href="/signup">Sign Up</a>
        <div className="right menu" id="logo-div">
          <h1 id="logo-h1" className="item">Fare Compare</h1>
        </div>
      </div>
    )
  }else {
    return(null)
  }
}

const NavBar = props => {

  return (
    navComponents(props.url)
  );
}

const mapStateToProps = (state,ownProps) => ({
  url: ownProps.match.url
});

export default withRouter(connect(mapStateToProps)(NavBar));
