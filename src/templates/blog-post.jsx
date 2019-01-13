import React from "react";
import { graphql } from "gatsby";

import Main from "../layouts/main";

export default ({ data: { post } }) => {
  return (
    <Main>
      <section>
        <header className="main content">
          <span className="date">{post.frontmatter.date}</span>
          <h1>{post.frontmatter.title}</h1>
        </header>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </section>
    </Main>
  );
};

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
