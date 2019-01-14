import React from "react";
import { Link } from "gatsby";

import Sidebar, { Header, Nav, Section, Footer } from "../editorial/Sidebar";
import ExternalLink from "../components/ExternalLink";

export default () => (
  <Sidebar>
    <Nav>
      <Header>Menu</Header>
      <ul>
        <li>
          <Link to="/">Home</Link>
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

    <Footer />
  </Sidebar>
);
