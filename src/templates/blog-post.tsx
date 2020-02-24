import React from 'react';
import { Helmet as Head } from 'react-helmet';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import rehypeReact from 'rehype-react';

import { Code, Img, Link, P, Pre, Section } from '../elements';
import SeriesBase from '../components/Series';
import { darkBlue } from '../theme/palette';

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
          {post.frontmatter.title} | {site.siteMetadata.title}
        </title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <Section>
        <header className="main">
          <span className="date">{post.frontmatter.date}</span>
          <h1>{post.frontmatter.title}</h1>
        </header>
        {series ? (
          <Columns>
            <PostBody>{renderAst(post.htmlAst)}</PostBody>
            <Series name={series.name}>
              <ol>
                {seriesPosts.edges.map(({ node: post }) => (
                  <li key={post.id}>
                    <SeriesLink href={post.fields.slug} activeClassName="active">
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
