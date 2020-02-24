import React from 'react';

import Link from '../../elements/a';

const Contribution = () => (
  <>
    Design{' '}
    <Link newTab href="https://html5up.net">
      HTML5 UP
    </Link>
  </>
);

const Footer = ({ children }) => (
  <footer id="footer">
    <p className="copyright">
      {typeof children === 'function' ? (
        children(Contribution)
      ) : (
        <>
          {children} <Contribution />
        </>
      )}
    </p>
  </footer>
);

export default Footer;
