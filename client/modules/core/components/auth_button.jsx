import React, {Component} from 'react';

export default class AuthButton extends Component {
  loggedOut() {
    return (
      <div className="ui animated fade primary fluid medium icon button"
           onClick={this.props.login}
           tabIndex="0">
        <div className="visible content"><i className="github alternate icon"/> Login with GitHub</div>
        <div className="hidden content">It's for free!!</div>
      </div>
    );
  }
  logging() {
    return (
      <button className="ui primary loading fluid medium button">Loading</button>
    );
  }
  loggedIn() {
    return (
      <button className="ui primary fluid medium icon button" onClick={this.props.logout} tabIndex="0">
        <i className="sign out icon"/> Logout
      </button>
    );
  }

  render() {
    let {loggedIn, loggingIn} = this.props;

    if (loggedIn) {
      return this.loggedIn();
    } else if (loggingIn) {
      return this.logging();
    } else {
      return this.loggedOut();
    }
  }
};
