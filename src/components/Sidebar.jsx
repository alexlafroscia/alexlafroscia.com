import React from "react";
import styled from "@emotion/styled";

import ExternalLinkBase from "../components/ExternalLink";
import Sidebar, { Header, Nav, Section, Footer } from "../editorial/Sidebar";
import Link from "../elements/a";
import { sanSerif } from "../theme/font";

const ExternalLink = styled(ExternalLinkBase)`
  font-family: ${sanSerif};
`;

export default () => (
  <Sidebar>
    <Nav>
      <Header>Menu</Header>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/resume">Resume</Link>
        </li>
        <li>
          <Link href="/articles/1">All Posts</Link>
        </li>
      </ul>
    </Nav>

    <Section title="Find Me Online">
      <ul className="contact">
        <li className="icon-github">
          <ExternalLink href="https://github.com/alexlafroscia">
            Github
          </ExternalLink>
        </li>
        <li className="icon-twitter">
          <ExternalLink href="https://twitter.com/alexlafroscia">
            Twitter
          </ExternalLink>
        </li>
        <li className="icon-medium">
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
