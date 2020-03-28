import React from 'react';
import { graphql } from 'gatsby';
import Markdown from 'markdown-to-jsx';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';

import { asPageWidth } from '../components/PageWidth';

const Header = asPageWidth('header');
const Section = asPageWidth('section');

const SectionHeader = styled.h2`
  text-align: center;

  @media (min-width: 700px) {
    text-align: left;
  }
`;

const InfoGroup = styled.div`
  margin-bottom: 1em;
`;

const Work = ({ work }) => (
  <InfoGroup
    css={css`
      align-items: center;
      column-gap: 1em;
      display: grid;
      grid-template-areas:
        'name name name'
        'role role role'
        'time time time'
        'details details details';
      grid-template-columns: auto 1fr auto;
      row-gap: 0.25em;

      @media (min-width: 450px) {
        grid-template-areas:
          'name name name'
          'role role time'
          'details details details';
      }

      @media (min-width: 700px) {
        grid-template-areas:
          'name role time'
          'details details details';
      }
    `}
  >
    <h3
      css={css`
        grid-area: name;
        margin: 0;
      `}
    >
      {work.company}
    </h3>
    <p
      css={css`
        grid-area: role;
        margin: 0;
      `}
    >
      {work.role}
    </p>
    <p
      css={css`
        grid-area: time;
        margin: 0;
      `}
    >
      {work.time}
    </p>
    <Details
      css={css`
        grid-area: details;
      `}
      details={work.details}
    />
  </InfoGroup>
);

const Details = ({ details, ...rest }) => (
  <ul {...rest}>
    {details.map((detail) => (
      <li
        key={detail}
        css={css`
          &:not(:last-of-type) {
            margin-bottom: 0.25em;
          }

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

const globalStyles = css`
  @media print {
    html {
      font-size: 12px;
    }

    a {
      color: inherit !important;
      text-decoration: none !important;

      &:visited {
        color: inherit !important;
      }
    }
  }
`;

export default function Resume({ data }) {
  const workExperiences = data.workExperiences.edges.map((e) => e.node);
  const openSourceProjects = data.openSourceProjects.edges.map((e) => e.node);

  return (
    <>
      <Header>
        <Global styles={globalStyles} />
        <div className="mx-24 my-8 grid grid-cols-2 gap-4">
          <h1 className="text-3xl font-bold text-center md:text-left col-span-2 md:col-span-1 md:row-span-2">
            Alex LaFroscia
          </h1>
          <span className="text-right">
            <a href="http://alexlafroscia.com">alexlafroscia.com</a>
          </span>
          <span className="md:text-right">
            <a href="mailto:alex@lafroscia.com">alex@lafroscia.com</a>
          </span>
        </div>
      </Header>

      <Section>
        <SectionHeader>Work Experiences</SectionHeader>

        {workExperiences.map((work) => (
          <Work key={work.company} work={work} />
        ))}
      </Section>

      <Section id="oss-projects">
        <SectionHeader>Notable Open Source Projects</SectionHeader>

        {openSourceProjects.map((project) => (
          <InfoGroup key={project.name}>
            <h3>
              <a
                css={css`
                  text-decoration: none;
                `}
                href={`https://github.com/${project.name}`}
              >
                {project.name}
              </a>
            </h3>
            <Details details={project.details} />
          </InfoGroup>
        ))}
      </Section>

      <Section>
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
    openSourceProjects: allOpenSourceProjectsYaml {
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
