import React, { useEffect, useState } from 'react';
import { globalHistory } from '@reach/router';
import { Helmet } from 'react-helmet';
import useDarkMode from 'use-dark-mode';
import cx from '@sindresorhus/class-names';
import { useStaticQuery, graphql } from 'gatsby';

import '../theme/dank-mono.css';
import '../theme/icomoon.css';

import { Icon, IconButton } from '../components/Icon';
import Link from '../elements/a';

import AsSectionHeader from '../styles/section-header';

const SectionHeader = AsSectionHeader('h2');

const Layout = ({ children }) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const darkMode = useDarkMode();
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

  useEffect(
    function() {
      const unsubscribe = globalHistory.listen(({ action }) => {
        if (action === 'PUSH') {
          setSidebarIsOpen(false);
        }
      });

      return unsubscribe;
    },
    [setSidebarIsOpen]
  );

  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://micro.blog/alexlafroscia" rel="me" />
      </Helmet>
      <div className="flex h-screen dark:text-white dark:bg-dark-blue">
        <div
          className={cx(
            'flex-shrink-0 h-full p-8 bg-gray-light absolute md:static dark:bg-blue-dark shadow-2xl md:shadow-lg',
            {
              hidden: !sidebarIsOpen
            }
          )}
        >
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <SectionHeader>Menu</SectionHeader>
              <button className="md:hidden" onClick={() => setSidebarIsOpen(false)}>
                <span className="hidden-from-screen">Close Sidebar</span>
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M14.7 15.3a1 1 0 0 1-1.4 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.4 1.4L11.42 12l3.3 3.3z" />
                </svg>
              </button>
            </div>
            <ul>
              <li className="mb-2">
                <Link href="/" className="hover:text-blue">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/articles/1" className="hover:text-blue">
                  All Posts
                </Link>
              </li>
            </ul>
          </section>
          <section className="mb-12">
            <SectionHeader className="mb-4 col-span-2">Find Me Online</SectionHeader>
            <div className="grid grid-cols-2 gap-4">
              {social.allSocialYaml.edges
                .map(edge => edge.node)
                .map(socialNode => (
                  <span
                    key={socialNode.icon}
                    className={`flex text-blue items-center icon icon-${socialNode.icon}`}
                  >
                    <Link
                      className="pl-2 font-sans text-black dark:text-white"
                      href={socialNode.link}
                    >
                      {socialNode.name}
                    </Link>
                  </span>
                ))}
            </div>
          </section>
          <section className="pt-2 text-xs border-t border-gray text-gray dark:text-white">
            <ul>
              <li>
                Colors from{' '}
                <Link newTab href="https://aka.ms/nightowl" className="border-b border-dotted">
                  Night Owl
                </Link>{' '}
                by{' '}
                <Link
                  newTab
                  href="https://sarahdrasnerdesign.com/"
                  className="border-b border-dotted"
                >
                  Sarah Drasner
                </Link>
              </li>
              <li>
                Built with{' '}
                <Link newTab href="https://www.gatsbyjs.org/" className="border-b border-dotted">
                  Gatsby
                </Link>
              </li>
            </ul>
          </section>
        </div>
        <div className="flex flex-col items-stretch flex-grow overflow-y-scroll">
          <header className="flex items-center pb-4 mx-4 mt-16 mb-4 border-b-4 sm:mx-8 border-blue">
            <button
              aria-checked={sidebarIsOpen}
              className={cx('mr-2', {
                'text-blue': sidebarIsOpen
              })}
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              role="switch"
            >
              <span className="hidden-from-screen">{sidebarIsOpen ? 'Close' : 'Open'} Sidebar</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path
                  className="fill-current dark:text-white"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              </svg>
            </button>
            <span className="flex-grow">
              <Link href="/" className="hover:text-blue">
                <strong>TIL</strong> by Alex LaFroscia
              </Link>
            </span>
            <nav className="items-center flex-shrink-0 hidden mr-4 text-lg sm:flex">
              <Icon
                className="mr-4 hover:text-blue"
                icon="github"
                href="https://github.com/alexlafroscia"
              >
                GitHub
              </Icon>
              <Icon
                className="mr-4 hover:text-blue"
                icon="twitter"
                href="https://twitter.com/alexlafroscia"
              >
                Twitter
              </Icon>
              <Icon
                className="mr-4 hover:text-blue"
                icon="medium"
                href="https://medium.com/@alexlafroscia"
              >
                Medium
              </Icon>
              <Icon className="hover:text-blue" icon="rss" href="/rss.xml">
                RSS
              </Icon>
            </nav>

            <IconButton className="text-lg text-gold" icon="lightbulb-o" onClick={darkMode.toggle}>
              Toggle Dark Mode
            </IconButton>
          </header>

          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
