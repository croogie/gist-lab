import React from 'react';

const noContent = () => null;

const Layout = ({content = noContent}) => (
  <div>
    {content()}
  </div>
);

export default Layout;
