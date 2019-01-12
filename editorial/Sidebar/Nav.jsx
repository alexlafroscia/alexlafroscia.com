const Nav = ({ children, ...rest }) => (
  <nav id="menu" {...rest}>
    {children}
  </nav>
);

export default Nav;
