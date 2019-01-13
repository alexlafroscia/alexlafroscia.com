import React from "react";

const Nav = ({ children, ...rest }) => (
  <nav id="menu" {...rest}>
    {children}
  </nav>
);

export default Nav;
