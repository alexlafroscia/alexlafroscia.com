import React from 'react';
import styled from '@emotion/styled';
import { Helmet as Head } from 'react-helmet';
import { graphql } from 'gatsby';

import { Section } from '../elements';
import Posts from '../components/Posts';
import Post from '../components/Post';
import Pagination, { Link as PaginationLink } from '../components/Pagination';

const TagHeader = styled.header`
  margin-bottom: 4em;
  text-align: center;

  @media (min-width: 738px) {
    margin-bottom: 6em;
  }
`;

export default ({ pageContext, data: { site, posts } }) => {
  return (
    <>
      <Head>
        <title>All Posts | {site.siteMetadata.title}</title>
        <meta name="description" content="All posts on TIL by Alex LaFroscia" />
      </Head>
      <Section>
        <TagHeader>
          <h1>All Posts</h1>
        </TagHeader>
        <header className="major">
          <h3>Page {pageContext.pageNumber}</h3>
        </header>
        <Posts>
          {posts.edges.map(({ node: post }) => (
            <Post key={post.id} post={post} />
          ))}
          {posts.edges.length % 2 !== 0 && <article />}
        </Posts>
        <Pagination
          currentPage={pageContext.pageNumber}
          totalPages={pageContext.totalPages}
          previous={
            pageContext.pageNumber > 1
              ? () => (
                  <PaginationLink href={`/articles/${pageContext.pageNumber - 1}`}>
                    Newer
                  </PaginationLink>
                )
              : undefined
          }
          next={
            pageContext.pageNumber < pageContext.totalPages
              ? () => (
                  <PaginationLink href={`/articles/${pageContext.pageNumber + 1}`}>
                    Older
                  </PaginationLink>
                )
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
