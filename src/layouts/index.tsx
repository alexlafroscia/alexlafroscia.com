import React from 'react';
import Main from './main';

const DefaultLayout = ({ pageContext, children }) => {
  if (pageContext.layout === 'none') {
    return children;
  }

  return <Main>{children}</Main>;
};

export default DefaultLayout;
