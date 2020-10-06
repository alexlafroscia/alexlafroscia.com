import React, { FunctionComponent } from 'react';
import { Helmet as Head } from 'react-helmet';
import { graphql } from 'gatsby';
import Markdown from 'markdown-to-jsx';
import { Global, css } from '@emotion/core';

import PageWidth from '../components/PageWidth';
import Link from '../elements/a';

const Section = ({ children, className = '', id = undefined }) => (
  <PageWidth as="section" className={`space-y-4 ${className}`} id={id}>
    {children}
  </PageWidth>
);

const SectionHeader = ({ children, className = '' }) => (
  <h2 className={`text-xl font-bold text-center md:text-left ${className}`}>{children}</h2>
);

const Work = ({ work }) => (
  <div
    className="items-center grid gap-x-4 gap-y-1"
    css={css`
      grid-template-areas:
        'name name name'
        'role role role'
        'time time time'
        'details details details';
      grid-template-columns: auto 1fr auto;

      @media (min-width: 640px) {
        grid-template-areas:
          'name name name'
          'role role time'
          'details details details';
      }

      @media (min-width: 768px) {
        grid-template-areas:
          'name role time'
          'details details details';
      }
    `}
  >
    <h3
      className="font-bold"
      css={css`
        grid-area: name;
      `}
    >
      {work.company}
    </h3>
    <p
      css={css`
        grid-area: role;
      `}
    >
      {work.role}
    </p>
    <p
      css={css`
        grid-area: time;
      `}
    >
      {work.time}
    </p>
    <Details
      details={work.details}
      css={css`
        grid-area: details;
      `}
    />
  </div>
);

const Details: FunctionComponent<{ details: string[]; className?: string }> = ({
  details,
  className,
  ...rest
}) => (
  <ul className={`list-disc ml-5 space-y-1 ${className}`} {...rest}>
    {details.map((detail) => (
      <li
        key={detail}
        css={css`
          span {
            line-height: 1.2em;
          }
        `}
      >
        <Markdown>{detail}</Markdown>
      </li>
    ))}
  </ul>
);

export default function Resume({ data }) {
  const workExperiences = data.workExperiences.edges.map((e) => e.node);
  const openSourceProjects = data.openSourceProjects.edges.map((e) => e.node);

  return (
    <>
      <Head>
        <title>Resume for Alex LaFroscia</title>

        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Global
        styles={css`
          @media print {
            html {
              font-size: 12px;
            }
          }
        `}
      />
      <PageWidth as="header" className="flex flex-col mx-24 my-8 md:flex-row md:justify-between">
        <h1 className="text-3xl font-bold text-center md:text-left">Alex LaFroscia</h1>
        <div className="flex justify-center md:flex-col md:items-end">
          <Link className="mr-4 text-right md:mr-0" href="/">
            alexlafroscia.com
          </Link>
          <a className="md:text-right" href="mailto:alex@lafroscia.com">
            alex@lafroscia.com
          </a>
        </div>
      </PageWidth>

      <Section className="mb-6">
        <SectionHeader>Work Experiences</SectionHeader>

        {workExperiences.map((work) => (
          <Work key={work.company} work={work} />
        ))}
      </Section>

      <Section className="mb-6" id="oss-projects">
        <SectionHeader>Notable Open Source Projects</SectionHeader>

        {openSourceProjects.map((project) => {
          const githubSlug = project.name.includes('/')
            ? project.name
            : `alexlafroscia/${project.name}`;

          return (
            <div key={project.name}>
              <h3>
                <a className="font-bold" href={`https://github.com/${githubSlug}`}>
                  {project.name}
                </a>
              </h3>
              <Details details={project.details} />
            </div>
          );
        })}
      </Section>

      <Section className="mb-6">
        <SectionHeader>Academics</SectionHeader>
        <ul>
          <li>
            BS in Computed Science from University of Pittsburgh, College of Arts and Sciences,
            Class of 2016.
          </li>
        </ul>
      </Section>
    </>
  );
}

export const query = graphql`
  {
    openSourceProjects: allOpenSourceProjectsYaml(filter: { hide: { ne: true } }) {
      edges {
        node {
          name
          details
        }
      }
    }
    workExperiences: allWorkExperiencesYaml(filter: { hide: { ne: true } }) {
      edges {
        node {
          company
          role
          time
          details
        }
      }
    }
  }
`;
