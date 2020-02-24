import React, { Fragment } from 'react';
import styled from '@emotion/styled';

import EditorialSidebar, { Header, Nav, Section, Footer } from '../editorial/Sidebar';
import LinkBase from '../elements/a';
import { sanSerif } from '../theme/font';
import { useStaticQuery, graphql } from 'gatsby';

const Link = styled(LinkBase)`
  font-family: ${sanSerif};
`;

const ContactList = styled.ul`
  display: grid;
  grid-column-gap: 1.5em;
  grid-row-gap: 0.75em;
  grid-template-columns: 1fr 1fr;
  list-style: none;
  padding: 0;

  li {
    align-items: center;
    display: flex;
    text-decoration: none;

    &::before {
      color: var(--theme-accent-color, #f56a6a);
      font-size: 1.5em;
      height: 1.125em;
      line-height: 1.125em;
      text-align: center;
      margin-right: 0.5em;
      width: 1.5em;
    }

    a {
      color: inherit;
    }
  }

  hr {
    grid-column: span 2;

    &:last-child {
      display: none;
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
      {({ reset }) => (
        <>
          <Nav>
            <Header>Menu</Header>
            <ul>
              <li>
                <Link href="/" onMouseUp={reset}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/resume" onMouseUp={reset}>
                  Resume
                </Link>
              </li>
              <li>
                <Link href="/articles/1" onMouseUp={reset}>
                  All Posts
                </Link>
              </li>
            </ul>
          </Nav>

          <Section title="Find Me Online">
            <ContactList>
              {social.allSocialYaml.edges
                .map(edge => edge.node)
                .map((socialNode, index) => (
                  <Fragment key={socialNode.icon}>
                    {index !== 0 && index % 2 == 0 && <hr />}
                    <li className={`icon-${socialNode.icon}`}>
                      <Link newTab href={socialNode.link}>
                        {socialNode.name}
                      </Link>
                    </li>
                  </Fragment>
                ))}
            </ContactList>
          </Section>

          <Footer>
            {Contribution => (
              <>
                <Contribution />
                <br />
                Colors from{' '}
                <Link newTab href="https://aka.ms/nightowl">
                  Night Owl
                </Link>{' '}
                by{' '}
                <Link newTab href="https://sarahdrasnerdesign.com/">
                  Sarah Drasner
                </Link>
                <br />
                Built with{' '}
                <Link newTab href="https://www.gatsbyjs.org/">
                  Gatsby
                </Link>
              </>
            )}
          </Footer>
        </>
      )}
    </EditorialSidebar>
  );
};

export default Sidebar;
