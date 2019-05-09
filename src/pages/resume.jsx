import React from "react";
import { graphql } from "gatsby";
import Markdown from "markdown-to-jsx";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";

import Section from "../elements/section";

const Title = styled.h1`
  text-align: center;
`;

const Details = ({ details }) => (
  <ul>
    {details.map(detail => (
      <li key={detail}>
        <Markdown>{detail}</Markdown>
      </li>
    ))}
  </ul>
);

const ContactGroup = styled.div`
  column-gap: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ContactItem = styled.span`
  &:nth-child(2n - 1) {
    text-align: right;
  }
`;

const Header = Section.withComponent("header");

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
        <Global styles={printStyles} />
        <Title>Alex LaFroscia</Title>
        <ContactGroup>
          <ContactItem>1 (631) 365-4582</ContactItem>
          <ContactItem>
            <a href="mailto:alex@lafroscia.com">alex@lafroscia.com</a>
          </ContactItem>
          <ContactItem>
            <a href="http://alexlafroscia.com">alexlafroscia.com</a>
          </ContactItem>
          <ContactItem>
            <a href="https://github.com/alexlafroscia">
              github.com/alexlafroscia
            </a>
          </ContactItem>
        </ContactGroup>
      </Header>

      <Section>
        <h2>Work Experiences</h2>

        {workExperiences.map(work => (
          <div key={work.company}>
            <h3>{work.company}</h3>
            <p>{work.description}</p>
            <Details details={work.details} />
          </div>
        ))}
      </Section>

      <Section id="oss-projects">
        <h2>Open Source Projects</h2>

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
          description
          details
        }
      }
    }
  }
`;
