import React from 'react';
import style from './home.scss';

const Home = ({version}) => (
  <div className={style.container}>
    <img className="ui centered medium image" src="/img/octocat.png" alt=""/>
    <h1 className="ui header centered">GIST Lab (v{version})</h1>
  </div>
);

export default Home;
