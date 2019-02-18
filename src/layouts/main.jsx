import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet";
import { Global, css } from "@emotion/core";

import Sidebar from "../components/Sidebar";
import Editorial from "../editorial";
import Header, { Icon, IconButton, Logo } from "../editorial/Header";
import { blue, darkBlue, gold, steel } from "../theme/palette";

const globalOverrides = css`
  body {
    --theme-primary-text-color: #5d6469;
    --theme-darker-text-color: #3d4449;
    --theme-secondary-background-color: #f5f6f7;

    --theme-accent-color: ${blue};
    --theme-accent-color-darker: ${darkBlue};

    --theme-divider-color: rgba(210, 215, 217, 0.75);
  }

  html[theme-mode="dark"] {
    body {
      --theme-primary-text-color: white;
      --theme-darker-text-color: ${steel};
      --theme-secondary-background-color: rgb(11, 41, 66);

      background-color: ${darkBlue};
    }
  }
`;

const DarkModeIcon = styled(IconButton)`
  --theme-accent-color: ${gold};
`;

const supportsDarkMode = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches === true;

class Layout extends React.Component {
  state = {
    mode: "light"
  };

  componentDidMount() {
    const lsDark = localStorage.getItem("dark-mode");

    if (lsDark) {
      this.setState({ mode: "dark" });
    } else if (supportsDarkMode()) {
      this.setState({ mode: "dark" });
    }
  }

  toggleDarkMode() {
    const { mode } = this.state;
    const next = mode === "light" ? "dark" : "light";

    if (next === "light") {
      localStorage.removeItem("dark-mode");
    } else {
      localStorage.setItem("dark-mode", true);
    }

    this.setState({ mode: next });
  }

  render() {
    const { children } = this.props;
    const { mode } = this.state;

    return (
      <Editorial sidebar={() => <Sidebar />}>
        <Global styles={globalOverrides} />
        <Helmet htmlAttributes={{ lang: "en", "theme-mode": mode }} />
        <Header
          logo={() => (
            <Logo>
              <strong>TIL</strong> by Alex LaFroscia
            </Logo>
          )}
        >
          <Icon icon="github" href="https://github.com/alexlafroscia">
            Github
          </Icon>
          <Icon icon="twitter" href="https://twitter.com/alexlafroscia">
            Twitter
          </Icon>
          <Icon icon="medium" href="https://medium.com/@alexlafroscia">
            Medium
          </Icon>
          <Icon icon="rss" href="/rss.xml">
            RSS
          </Icon>

          <DarkModeIcon
            mode={mode}
            icon="lightbulb-o"
            onClick={() => this.toggleDarkMode()}
          >
            Toggle Dark Mode
          </DarkModeIcon>
        </Header>

        {children}
      </Editorial>
    );
  }
}

export default Layout;
