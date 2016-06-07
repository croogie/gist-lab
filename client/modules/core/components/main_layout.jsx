import React from 'react';
import style from './main_layout.scss';
import {Accounts} from 'meteor/std:accounts-ui';
import {EnsureLoggedIn} from 'meteor-auth';

const noContent = () => null;

const Layout = ({content = noContent, loggedIn, loggingIn, logout}) => (
  <div className={style.container}>
    <div className={style.menu}>
      {
        loggedIn ? <div>Hi there
          <button onClick={logout}>Logout</button>
        </div> :
          loggingIn ? <div>Loading...</div> : <div>Login using <Accounts.ui.LoginForm /></div>
      }
    </div>
    <div className={style.list}>list</div>
    <div className={style.content}>
      <EnsureLoggedIn>
        {content()}
      </EnsureLoggedIn>
    </div>
  </div>
);

export default Layout;
