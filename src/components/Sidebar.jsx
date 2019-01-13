import React from "react";
import { Link } from "gatsby";

import Sidebar, { Header, Nav, Section, Footer } from "../editorial/Sidebar";

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
        <li className="fa-twitter">
          <a href="https://twitter.com/alexlafroscia">@alexlafroscia</a>
        </li>
        <li className="fa-github">
          <a href="https://github.com/alexlafroscia">@alexlafroscia</a>
        </li>
      </ul>
    </Section>

    <Footer />
  </Sidebar>
);
