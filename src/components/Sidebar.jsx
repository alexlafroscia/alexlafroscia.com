import React from "react";

import ExternalLink from "../components/ExternalLink";
import Sidebar, { Header, Nav, Section, Footer } from "../editorial/Sidebar";
import Link from "../elements/a";

export default () => (
  <Sidebar>
    <Nav>
      <Header>Menu</Header>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/articles/1">All Posts</Link>
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
          Colors from{" "}
          <ExternalLink href="https://aka.ms/nightowl">
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
  </Sidebar>
);
