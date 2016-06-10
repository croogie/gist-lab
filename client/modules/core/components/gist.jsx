import React from 'react';

const Gist = ({id}) => (
  <div>
    <h1 className="ui header">
      Showing GIST file
      <div className="sub header">ID: {id}</div>
    </h1>
  </div>
);

export default Gist;
