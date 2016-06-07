import React from 'react';
import style from './main_layout.scss';

const noContent = () => null;

const Layout = ({content = noContent}) => (
  <div className={style.container}>
    <div className={style.menu}>menu</div>
    <div className={style.list}>list</div>
    <div className={style.content}>{content()}</div>
  </div>
);

export default Layout;
