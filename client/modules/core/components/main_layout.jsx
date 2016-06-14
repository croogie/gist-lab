import React from 'react';
import Menu from '../containers/menu';
import style from './main_layout.scss';

const noContent = () => null;

const Layout = ({content = noContent, list = noContent(), loggedIn}) => (
  <div className={style.container}>
    <div className={style.menu}>
      <Menu />
    </div>
       {loggedIn ? <div className={style.list}>{list()}</div> : null}
    <div className={style.content}>
      {content()}
    </div>
  </div>
);

export default Layout;
