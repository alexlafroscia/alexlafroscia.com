import React from "react";
import styled from "@emotion/styled";

import Sidebar, { Header, Nav, Section, Footer } from "../editorial/Sidebar";
import LinkBase from "../elements/a";
import { sanSerif } from "../theme/font";

const Link = styled(LinkBase)`
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
          <Link newTab href="https://github.com/alexlafroscia">
            Github
          </Link>
        </li>
        <li className="icon-twitter">
          <Link newTab href="https://twitter.com/alexlafroscia">
            Twitter
          </Link>
        </li>
        <li className="icon-medium">
          <Link newTab href="https://medium.com/@alexlafroscia">
            Medium
          </Link>
        </li>
      </ul>
    </Section>

    <Footer>
      {Contribution => (
        <>
          <Contribution />
          <br />
          Colors from{" "}
          <Link newTab href="https://aka.ms/nightowl">
            Night Owl
          </Link>{" "}
          by{" "}
          <Link newTab href="https://sarahdrasnerdesign.com/">
            Sarah Drasner
          </Link>
          <br />
          Built with{" "}
          <Link newTab href="https://www.gatsbyjs.org/">
            Gatsby
          </Link>
        </>
      )}
    </Footer>
  </Sidebar>
);
