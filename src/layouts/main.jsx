import React from "react";
import { Helmet } from "react-helmet";

import Editorial from "../editorial";
import Header, { Icon, Logo } from "../editorial/Header";

import Sidebar from "../components/Sidebar";

export default ({ children }) => (
  <Editorial sidebar={() => <Sidebar />}>
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
    </Header>

    {children}
  </Editorial>
);
