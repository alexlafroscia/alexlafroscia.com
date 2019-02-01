import React from "react";
import { Helmet as Head } from "react-helmet";
import { graphql } from "gatsby";

import Link from "../elements/a";

export default ({ data: { recentPosts, site } }) => (
  <>
    <Head>
      <title>{site.siteMetadata.title}</title>
    </Head>
    <article id="banner">
      <div className="content">
        <header>
          <h1>
            <Link href="/">{site.siteMetadata.title}</Link>
          </h1>
          <p>Stuff I learned and want to share</p>
        </header>
      </div>
    </article>
    <section>
      <header className="major">
        <h3>Recent Posts</h3>
      </header>
      <div className="posts">
        {recentPosts.edges
          .map(e => e.node)
          .map(post => (
            <article key={post.id}>
              <h3>{post.frontmatter.title}</h3>
              <p>{post.frontmatter.description}</p>
              <ul className="actions">
                <li>
                  <Link href={post.fields.slug} className="button">
                    Read It!
                  </Link>
                </li>
              </ul>
            </article>
          ))}
      </div>
    </section>
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
