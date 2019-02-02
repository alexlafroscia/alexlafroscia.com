import React from "react";
import styled from "@emotion/styled";

import ExternalLink from "../components/ExternalLink";
import Sidebar, { Header, Nav, Section, Footer } from "../editorial/Sidebar";
import Link from "../elements/a";
import { darkBlue } from "../theme/palette";

const SidebarWithDarkMode = styled(Sidebar)`
  html[theme-mode="dark"] & {
    background-color: ${darkBlue} !important;
  }
`;

export default () => (
  <SidebarWithDarkMode>
    <Nav>
      <Header>Menu</Header>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>
    </Nav>

    <Section title="Find Me Online">
      <ul className="contact">
        <li className="fa-github">
          <ExternalLink href="https://github.com/alexlafroscia">
            Github
          </ExternalLink>
        </li>
        <li className="fa-twitter">
          <ExternalLink href="https://twitter.com/alexlafroscia">
            Twitter
          </ExternalLink>
        </li>
        <li className="fa-medium">
          <ExternalLink href="https://medium.com/@alexlafroscia">
            Medium
          </ExternalLink>
        </li>
      </ul>
    </Section>

    <Footer>
      {Contribution => (
        <>
          <Contribution />
          <br />
          Color scheme from{" "}
          <ExternalLink href="https://marketplace.visualstudio.com/items?itemName=sdras.night-owl">
            Night Owl
          </ExternalLink>{" "}
          by{" "}
          <ExternalLink href="https://sarahdrasnerdesign.com/">
            Sarah Drasner
          </ExternalLink>
          <br />
          Built with{" "}
          <ExternalLink href="https://www.gatsbyjs.org/">Gatsby</ExternalLink>
        </>
      )}
    </Footer>
  </SidebarWithDarkMode>
);
