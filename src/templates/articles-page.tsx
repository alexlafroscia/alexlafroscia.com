import React from 'react';
import { Helmet as Head } from 'react-helmet';
import { graphql } from 'gatsby';

import Posts from '../components/Posts';
import Pagination, { NextLink, PreviousLink } from '../components/Pagination';
import { asPageWidth } from '../components/PageWidth';
import { asSectionHeader } from '../components/SectionHeader';

const Section = asPageWidth('section');
const PageHeader = asSectionHeader('h2');

export default ({ pageContext, data: { site, posts } }) => {
  return (
    <>
      <Head>
        <title>All Posts | {site.siteMetadata.title}</title>
        <meta name="description" content="All posts on TIL by Alex LaFroscia" />
      </Head>
      <Section>
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold">All Posts</h1>
        </header>
        <PageHeader>Page {pageContext.pageNumber}</PageHeader>
        <Posts posts={posts.edges.map(({ node }) => node)}></Posts>
        <Pagination
          currentPage={pageContext.pageNumber}
          totalPages={pageContext.totalPages}
          previous={
            pageContext.pageNumber > 1
              ? () => (
                  <PreviousLink href={`/articles/${pageContext.pageNumber - 1}`}>
                    Newer
                  </PreviousLink>
                )
              : undefined
          }
          next={
            pageContext.pageNumber < pageContext.totalPages
              ? () => <NextLink href={`/articles/${pageContext.pageNumber + 1}`}>Older</NextLink>
              : undefined
          }
        />
      </Section>
    </>
  );
};

export const pageQuery = graphql`
  query ArticlesPage($skipArticles: Int!) {
    site {
      siteMetadata {
        title
      }
    }

    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skipArticles
      limit: 6
    ) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            description
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
