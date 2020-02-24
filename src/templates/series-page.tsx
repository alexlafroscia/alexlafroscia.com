import React from 'react';
import { Helmet as Head } from 'react-helmet';
import { graphql } from 'gatsby';

import { asPageWidth } from '../components/PageWidth';
import Posts from '../components/Posts';

const Section = asPageWidth('section');

export default ({ data: { site, series, posts } }) => (
  <>
    <Head>
      <title>
        {series.name} | {site.siteMetadata.title}
      </title>
      <meta name="description" content={series.description} />
    </Head>
    <Section>
      <header className="mb-12 text-center">
        <h1 className="mb-2 text-4xl font-bold">{series.name}</h1>
        <p className="text-center">{series.description}</p>
      </header>
      <Posts posts={posts.edges.map(({ node }) => node)} />
    </Section>
  </>
);

export const pageQuery = graphql`
  query PostsInSeries($seriesSlug: String!) {
    site {
      siteMetadata {
        title
      }
    }

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
