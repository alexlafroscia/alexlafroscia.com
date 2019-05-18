import React from "react";
import { graphql } from "gatsby";
import Markdown from "markdown-to-jsx";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";

import Section from "../elements/section";

const ContactGroup = styled.div`
  display: grid;
  grid-template-areas: "name website" "name email";
  margin: 2em 6em;
`;

const Name = styled.h1`
  grid-area: name;
  margin: 0;
`;

const Website = styled.span`
  grid-area: website;
  text-align: right;
`;

const Email = styled.span`
  grid-area: email;
  text-align: right;
`;

const Work = ({ work }) => (
  <div
    css={css`
      align-items: center;
      display: grid;
      grid-template-areas: "name role time" "details details details";
      grid-template-columns: auto 1fr auto;
      margin-bottom: 1em;
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
        padding-left: 1em;
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
  </div>
);

const Details = ({ details, ...rest }) => (
  <ul {...rest}>
    {details.map(detail => (
      <li key={detail}>
        <Markdown>{detail}</Markdown>
      </li>
    ))}
  </ul>
);

const Header = Section.withComponent("header");

const globalStyles = css`
  html {
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, sans-serif;
  }
`;

const printStyles = css`
  @page {
    margin: 0.3in;
  }

  @media print {
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
  const workExperiences = data.workExperiences.edges.map(e => e.node);
  const openSourceProjects = data.openSourceProjects.edges.map(e => e.node);

  return (
    <>
      <Header>
        <Global styles={globalStyles} />
        <Global styles={printStyles} />
        <ContactGroup>
          <Name>Alex LaFroscia</Name>
          <Website>
            <a href="http://alexlafroscia.com">alexlafroscia.com</a>
          </Website>
          <Email>
            <a href="mailto:alex@lafroscia.com">alex@lafroscia.com</a>
          </Email>
        </ContactGroup>
      </Header>

      <Section>
        <h2>Work Experiences</h2>

        {workExperiences.map(work => (
          <Work key={work.company} work={work} />
        ))}
      </Section>

      <Section id="oss-projects">
        <h2>Notable Open Source Projects</h2>

        {openSourceProjects.map(project => (
          <div key={project.name}>
            <h3>
              <a href={`https://github.com/${project.name}`}>{project.name}</a>
            </h3>
            <Details details={project.details} />
          </div>
        ))}
      </Section>

      <Section>
        <h2>Academics</h2>
        <ul>
          <li>
            BS in Computed Science from University of Pittsburgh, College of
            Arts and Sciences, Class of 2016.
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
