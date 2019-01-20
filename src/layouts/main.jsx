import React from "react";
import { Helmet } from "react-helmet";
import { Global, css } from "@emotion/core";

import Editorial from "../editorial";
import Header, { Icon, Logo } from "../editorial/Header";

import Sidebar from "../components/Sidebar";

const globalOverrides = css`
  body {
    --theme-primary-text-color: #5d6469;
    --theme-darker-text-color: #3d4449;

    --theme-accent-color: #ec0000;
    --theme-accent-color-darker: #e60000;
  }
`;

export default ({ children }) => (
  <Editorial sidebar={() => <Sidebar />}>
    <Global styles={globalOverrides} />
    <Helmet htmlAttributes={{ lang: "en" }} />
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
    </Header>

    {children}
  </Editorial>
);
