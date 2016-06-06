import React from 'react';
import {Accounts} from 'meteor/std:accounts-ui';
import {EnsureLoggedIn} from 'meteor-auth';

const noContent = () => null;

const Layout = ({content = noContent, loggedIn, loggingIn, logout}) => (
  <div>
    {
      loggedIn ? <div>Hi there <button onClick={logout}>Logout</button></div> :
        loggingIn ? <div>Loading...</div> : <div>Login using <Accounts.ui.LoginForm /></div>
    }

    <EnsureLoggedIn>
      {content()}
    </EnsureLoggedIn>
  </div>
);

export default Layout;
