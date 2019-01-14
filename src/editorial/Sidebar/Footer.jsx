import React from "react";

import ExternalLink from "../../components/ExternalLink";

const Contribution = () => (
  <>
    Design <ExternalLink href="https://html5up.net">HTML5 UP</ExternalLink>
  </>
);

const Footer = ({ children }) => (
  <footer id="footer">
    <p className="copyright">
      {typeof children === "function" ? (
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
