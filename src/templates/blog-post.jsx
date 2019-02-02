import React from "react";
import { Helmet as Head } from "react-helmet";
import styled from "@emotion/styled";
import { graphql } from "gatsby";
import rehypeReact from "rehype-react";

import { Code, Img, Link, Pre } from "../elements";
import { darkBlue } from "../theme/palette";

const Section = styled.section`
  margin: 0 auto;
  max-width: 900px;
`;

const PostBody = styled.article`
  font-size: 1.2em;

  ${Link} {
    border-bottom: dotted 1px;
    color: ${darkBlue};

    code {
      color: var(--theme-accent-color-darker);
    }
  }
`;

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    a: Link,
    code: Code,
    img: Img,
    pre: Pre
  }
}).Compiler;

export default ({ data: { post, site } }) => (
  <>
    <Head>
      <title>
        {post.frontmatter.title} | {site.siteMetadata.title}
      </title>
      <meta name="description" content={post.excerpt} />
    </Head>
    <Section>
      <header className="main">
        <span className="date">{post.frontmatter.date}</span>
        <h1>{post.frontmatter.title}</h1>
      </header>
      <PostBody>{renderAst(post.htmlAst)}</PostBody>
    </Section>
  </>
);

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      htmlAst
      excerpt
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
