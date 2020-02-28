import React from 'react';
import { Helmet as Head } from 'react-helmet';
import cx from '@sindresorhus/class-names';
import { graphql } from 'gatsby';
import rehypeReact from 'rehype-react';

import { Code, Img, Link, P } from '../elements';
import Series from '../components/Series';

const documentElementClasses = ['mb-4', 'max-w-full'];
const headerClasses = ['font-bold', 'leading-tight', 'mt-8'];

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    a: ({ className, ...rest }) => (
      <Link
        className={cx('border-b', 'border-dotted', 'text-dark-blue', 'dark:text-white', className)}
        {...rest}
      />
    ),
    h1: ({ className = undefined, ...rest }) => (
      <h1
        className={cx('text-4xl', ...documentElementClasses, ...headerClasses, className)}
        {...rest}
      />
    ),
    h2: ({ className, ...rest }) => (
      <h2
        className={cx('text-3xl', ...documentElementClasses, ...headerClasses, className)}
        {...rest}
      />
    ),
    h3: ({ className, ...rest }) => (
      <h3
        className={cx('text-2xl', ...documentElementClasses, ...headerClasses, className)}
        {...rest}
      />
    ),
    h4: ({ className, ...rest }) => (
      <h4
        className={cx('text-xl', ...documentElementClasses, ...headerClasses, className)}
        {...rest}
      />
    ),
    h5: ({ className, ...rest }) => (
      <h5
        className={cx('text-lg', ...documentElementClasses, ...headerClasses, className)}
        {...rest}
      />
    ),
    hr: ({ className, ...rest }) => (
      <hr className={cx(...documentElementClasses, className)} {...rest} />
    ),
    code: Code,
    img: Img,
    ol: ({ className, ...rest }) => (
      <ol className={cx('list-decimal', 'ml-5', ...documentElementClasses, className)} {...rest} />
    ),
    p: ({ className, ...rest }) => (
      <P className={cx(...documentElementClasses, className)} {...rest} />
    ),
    pre: ({ className, ...rest }) => (
      <pre
        className={cx(
          'bg-dark-blue',
          'p-4',
          'rounded-lg',
          'overflow-auto',
          'border-2',
          'border-dark-blue',
          'dark:border-blue',
          ...documentElementClasses,
          className
        )}
        {...rest}
      />
    ),
    ul: ({ className, ...rest }) => (
      <ul className={cx('list-disc', 'ml-5', ...documentElementClasses, className)} {...rest} />
    )
  }
}).Compiler;

export default ({ data: { post, site, series, seriesPosts } }) => (
  <>
    <Head>
      <title>
        {post.frontmatter.title} | {site.siteMetadata.title}
      </title>
      <meta name="description" content={post.excerpt} />
    </Head>
    <div className="max-w-full px-4 mx-auto sm:px-8">
      <header className="mb-4 max-w-readable">
        <span className="text-sm">{post.frontmatter.date}</span>
        <h1 className="text-4xl font-bold leading-tight">{post.frontmatter.title}</h1>
      </header>
      {series ? (
        <Series className="mb-4" name={series.name}>
          <ol className="ml-5 list-decimal">
            {seriesPosts.edges.map(({ node: post }) => (
              <li key={post.id}>
                <Link
                  href={post.fields.slug}
                  className="whitespace-no-wrap text-blue"
                  activeClassName="active"
                >
                  {post.frontmatter.series.title}
                </Link>
              </li>
            ))}
          </ol>
        </Series>
      ) : (
        undefined
      )}
      <article className="mb-16 max-w-readable">{renderAst(post.htmlAst)}</article>
    </div>
  </>
);

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
