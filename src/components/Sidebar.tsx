import React from "react";
import styled from "@emotion/styled";

import EditorialSidebar, {
  Header,
  Nav,
  Section,
  Footer
} from "../editorial/Sidebar";
import LinkBase from "../elements/a";
import { sanSerif } from "../theme/font";
import { useStaticQuery, graphql } from "gatsby";

const Link = styled(LinkBase)`
  font-family: ${sanSerif};
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    text-decoration: none;
    border-top: solid 1px var(--theme-divider-color);
    margin: 1.5em 0 0 0;
    padding: 1.5em 0 0 3em;
    position: relative;

    &:before {
      color: var(--theme-accent-color, #f56a6a);
      display: inline-block;
      font-size: 1.5em;
      height: 1.125em;
      left: 0;
      line-height: 1.125em;
      position: absolute;
      text-align: center;
      top: 1em;
      width: 1.5em;
    }

    &:first-of-type {
      border-top: 0;
      margin-top: 0;
      padding-top: 0;

      &:before {
        top: 0;
      }
    }

    a {
      color: inherit;
    }
  }
`;

const Sidebar = () => {
  const social = useStaticQuery(graphql`
    {
      allSocialYaml {
        edges {
          node {
            name
            icon
            link
          }
        }
      }
    }
  `);

  return (
    <EditorialSidebar>
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
        <ContactList>
          {social.allSocialYaml.edges
            .map(edge => edge.node)
            .map(socialNode => (
              <li key={socialNode.icon} className={`icon-${socialNode.icon}`}>
                <Link newTab href={socialNode.link}>
                  {socialNode.name}
                </Link>
              </li>
            ))}
        </ContactList>
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
    </EditorialSidebar>
  );
};

export default Sidebar;
