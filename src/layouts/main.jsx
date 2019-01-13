import React from "react";

import Editorial from "../editorial";
import Header, { Icon, Logo } from "../editorial/Header";

import Sidebar from "../components/Sidebar";

export default ({ children }) => (
  <Editorial sidebar={() => <Sidebar />}>
    <Header
      logo={() => (
        <Logo>
          <strong>TIL</strong> by Alex LaFroscia
        </Logo>
      )}
    >
      <Icon icon="twitter" href="https://twitter.com/alexlafroscia">
        Twitter
      </Icon>
    </Header>

    {children}
  </Editorial>
);
