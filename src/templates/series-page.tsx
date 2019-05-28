import React from "react";
import styled from "@emotion/styled";
import { Helmet as Head } from "react-helmet";
import { graphql } from "gatsby";

import { Section } from "../elements";
import Posts from "../components/Posts";
import Post from "../components/Post";

const TagHeader = styled.header`
  margin-bottom: 4em;
  text-align: center;

  @media (min-width: 738px) {
    margin-bottom: 6em;
  }
`;

const Description = styled.p`
  max-width: 600px;
  margin: 0 auto;
`;

export default ({ data: { series, posts } }) => (
  <>
    <Head>
      <title>{series.name}</title>
      <meta name="description" content={series.description} />
    </Head>
    <Section>
      <TagHeader>
        <h1>{series.name}</h1>
        <Description>{series.description}</Description>
      </TagHeader>
      <Posts>
        {posts.edges.map(({ node: post }) => (
          <Post key={post.id} post={post} />
        ))}
      </Posts>
    </Section>
  </>
);

export const pageQuery = graphql`
  query PostsInSeries($seriesSlug: String!) {
    series: seriesYaml(slug: { eq: $seriesSlug }) {
      name
      description
    }
    posts: allMarkdownRemark(
      filter: { frontmatter: { series: { slug: { eq: $seriesSlug } } } }
      sort: { fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            series {
              title
            }
            description
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
