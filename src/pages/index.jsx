import React from "react";
import { Helmet as Head } from "react-helmet";
import { Link, graphql } from "gatsby";

import Main from "../layouts/main";

export default ({ data: { recentPosts, site } }) => (
  <Main>
    <Head>
      <title>{site.siteMetadata.title}</title>
    </Head>
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
                  <Link to={post.fields.slug} className="button">
                    Read It!
                  </Link>
                </li>
              </ul>
            </article>
          ))}
      </div>
    </section>
  </Main>
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
