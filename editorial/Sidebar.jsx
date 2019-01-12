import { Component } from "react";

export const Header = ({ children }) => (
  <header className="major">
    <h2>{children}</h2>
  </header>
);

export const Nav = ({ children, ...rest }) => (
  <nav id="menu" {...rest}>
    {children}
  </nav>
);

export const Section = ({ children, title }) => (
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

const Contribution = () => (
  <>
    Design{" "}
    <a href="https://html5up.net" target="_blank">
      HTML5 UP
    </a>
  </>
);

export const Footer = ({ children }) => (
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

export default class Sidebar extends Component {
  state = {
    inactive: false
  };

  toggleSidebarActivity = event => {
    event.preventDefault();
    event.stopPropagation();

    this.setState(state => ({
      ...state,
      inactive: !state.inactive
    }));
  };

  render() {
    const { children } = this.props;
    const { inactive } = this.state;

    return (
      <div id="sidebar" className={inactive ? "inactive" : undefined}>
        <div className="inner">{children}</div>
        <a
          href="#sidebar"
          className="toggle"
          onClick={this.toggleSidebarActivity}
        >
          Toggle
        </a>
      </div>
    );
  }
}
