import React from 'react';
import { Helmet as Head } from 'react-helmet';
import { graphql } from 'gatsby';

import { asPageWidth } from '../components/PageWidth';
import Pagination, { NextLink as PaginationLink } from '../components/Pagination';
import Posts from '../components/Posts';
import { asSectionHeader } from '../components/SectionHeader';

const Header = asPageWidth('header');
const Section = asPageWidth('section');
const SectionHeader = asSectionHeader('h2');

export default ({ data: { recentPosts, series, site } }) => (
  <>
    <Head>
      <title>{site.siteMetadata.title}</title>
    </Head>
    <Header className="py-8">
      <h1 className="text-4xl font-bold leading-tight">{site.siteMetadata.title}</h1>
      <p className="text-sm tracking-wider uppercase">Stuff I learned and want to share</p>
    </Header>
    <Section>
      <header className="md:mb-4">
        <SectionHeader>Recent Posts</SectionHeader>
      </header>
      <Posts posts={recentPosts.edges.map(({ node }) => node)} series={series.nodes} />
      <Pagination next={() => <PaginationLink href="/articles/2">Older Posts</PaginationLink>} />
    </Section>
  </>
);

export const pageQuery = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
      }
    }

    recentPosts: allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 6) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            description
            date
            series {
              slug
            }
          }
        }
      }
    }

    series: allSeriesYaml {
      nodes {
        slug
        name
      }
    }
  }
`;
