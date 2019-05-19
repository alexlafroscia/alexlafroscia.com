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
        <ul className="contact">
          {social.allSocialYaml.edges
            .map(edge => edge.node)
            .map(socialNode => (
              <li key={socialNode.icon} className={`icon-${socialNode.icon}`}>
                <Link newTab href={socialNode.link}>
                  {socialNode.name}
                </Link>
              </li>
            ))}
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
    </EditorialSidebar>
  );
};

export default Sidebar;
