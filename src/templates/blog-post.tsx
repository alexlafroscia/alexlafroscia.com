import React from "react";
import { Helmet as Head } from "react-helmet";
import styled from "@emotion/styled";
import { graphql } from "gatsby";
import rehypeReact from "rehype-react";

import { Code, Img, Link, P, Pre, Section } from "../elements";
import SeriesBase from "../components/Series";
import { darkBlue } from "../theme/palette";

const Header = styled.header`
  margin-bottom: 1rem;
`;

const SeriesTitle = styled.span`
  font-size: 1rem;
  font-style: italic;
  font-weight: 300;
`;

const Title = styled.h1`
  margin: 0;
`;

const Columns = styled.div`
  display: flex;
  flex-direction: column-reverse;

  @media (min-width: 900px) {
    align-items: flex-start;
    flex-direction: row;
  }
`;

const Series = styled(SeriesBase)`
  @media (min-width: 900px) {
    min-width: 200px;
  }
`;

const SeriesLink = styled(Link)`
  &.active {
    font-weight: bold;
  }
`;

const PostBody = styled.article`
  font-size: 1.2em;

  ${Link} {
    border-bottom: dotted 1px;
    color: ${darkBlue};

    body.dark-mode & {
      color: var(--theme-darker-text-color);
    }
  }
`;

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    a: Link,
    code: Code,
    img: Img,
    p: P,
    pre: Pre
  }
}).Compiler;

export default ({ data: { post, site, series, seriesPosts } }) => {
  return (
    <>
      <Head>
        <title>
          {post.frontmatter.title} { series ? ` | ${series.name}` : undefined} | {site.siteMetadata.title}
        </title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <Section>
        <Header className="main">
          {series ? <SeriesTitle>Series: {series.name}</SeriesTitle> : undefined }
          <Title>{post.frontmatter.title}</Title>
          <span className="date">{post.frontmatter.date}</span>
        </Header>
          {series && seriesPosts.edges.length > 1 ? (
          <Columns>
            <PostBody>{renderAst(post.htmlAst)}</PostBody>
            <Series>
              <ol>
                {seriesPosts.edges.map(({ node: post }) => (
                  <li key={post.id}>
                    <SeriesLink
                      href={post.fields.slug}
                      activeClassName="active"
                    >
                      {post.frontmatter.series.title}
                    </SeriesLink>
                  </li>
                ))}
              </ol>
            </Series>
          </Columns>
        ) : (
          <PostBody>{renderAst(post.htmlAst)}</PostBody>
        )}
      </Section>
    </>
  );
};

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $seriesSlug: String) {
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

    series: seriesYaml(slug: { eq: $seriesSlug }) {
      name
    }

    seriesPosts: allMarkdownRemark(
      filter: { frontmatter: { series: { slug: { eq: $seriesSlug } } } }
      sort: { fields: frontmatter___date }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            series {
              title
            }
          }
        }
      }
    }
  }
`;
