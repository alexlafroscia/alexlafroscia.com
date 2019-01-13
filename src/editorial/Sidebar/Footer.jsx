import React from "react";

const Contribution = () => (
  <>
    Design{" "}
    <a href="https://html5up.net" target="_blank" rel="noopener noreferrer">
      HTML5 UP
    </a>
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
