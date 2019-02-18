import React from "react";
import { Helmet as Head } from "react-helmet";
import { graphql } from "gatsby";

import { Link, Section } from "../elements";
import Pagination, { Link as PaginationLink } from "../components/Pagination";
import Posts from "../components/Posts";
import Post from "../components/Post";

const Article = Section.withComponent("article");

export default ({ data: { recentPosts, site } }) => (
  <>
    <Head>
      <title>{site.siteMetadata.title}</title>
    </Head>
    <Article id="banner">
      <div className="content">
        <header>
          <h1>
            <Link href="/">{site.siteMetadata.title}</Link>
          </h1>
          <p>Stuff I learned and want to share</p>
        </header>
      </div>
    </Article>
    <Section>
      <header className="major">
        <h3>Recent Posts</h3>
      </header>
      <Posts>
        {recentPosts.edges.map(({ node: post }) => (
          <Post key={post.id} post={post} />
        ))}
      </Posts>
    </Section>
    <Pagination
      next={() => (
        <PaginationLink href="/articles/2">Older Posts</PaginationLink>
      )}
    />
  </>
);

export const pageQuery = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
      }
    }
    recentPosts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 6
    ) {
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
          }
        }
      }
    }
  }
`;
