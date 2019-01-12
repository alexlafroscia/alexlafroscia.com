const Section = ({ children, title }) => (
  <section>
    {title ? (
      <header className="major">
        <h2>{title}</h2>
      </header>
    ) : (
      undefined
    )}
    {children}
  </section>
);

export default Section;
