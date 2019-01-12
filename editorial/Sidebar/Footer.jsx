const Contribution = () => (
  <>
    Design{" "}
    <a href="https://html5up.net" target="_blank">
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
