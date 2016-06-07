import React from 'react';
import style from './main_layout.scss';
import {Accounts} from 'meteor/std:accounts-ui';
import {EnsureLoggedIn} from 'meteor-auth';

const noContent = () => null;

const Layout = ({content = noContent, loggedIn, loggingIn, logout}) => (
  <div className={style.container}>
    <div className={style.menu}>
       {
         loggedIn ? <button className="ui button fluid" onClick={logout}><i className="user icon" />Logout</button> :
           loggingIn ? <div>Loading...</div> : <Accounts.ui.LoginForm />
       }
    </div>
    {loggedIn ? <div className={style.list}>list</div> : null}
    <div className={style.content}>
      <EnsureLoggedIn>
        {content()}
      </EnsureLoggedIn>
    </div>
  </div>
);

export default Layout;
