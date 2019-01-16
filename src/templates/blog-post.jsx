import React from "react";
import { Helmet as Head } from "react-helmet";
import styled from "@emotion/styled";
import { graphql } from "gatsby";

import Main from "../layouts/main";

const PostBody = styled.article`
  font-size: 1.2em;
`;

export default ({ data: { post, site } }) => {
  return (
    <Main>
      <Head>
        <title>
          {post.frontmatter.title} | {site.siteMetadata.title}
        </title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <section>
        <header className="main">
          <span className="date">{post.frontmatter.date}</span>
          <h1>{post.frontmatter.title}</h1>
        </header>
        <PostBody dangerouslySetInnerHTML={{ __html: post.html }} />
      </section>
    </Main>
  );
};

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      excerpt
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
