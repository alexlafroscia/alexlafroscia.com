const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.jsx`);
  const seriesPage = path.resolve(`./src/templates/series-page.jsx`);
  return graphql(
    `
      {
        posts: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                series {
                  slug
                }
              }
            }
          }
        }

        series: allSeriesYaml {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
  ).then(({ errors, data }) => {
    if (errors) {
      throw errors;
    }

    // Create blog posts pages.
    const posts = data.posts.edges;
    posts.forEach((post, index) => {
      const previous =
        index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          seriesSlug:
            post.node.frontmatter.series && post.node.frontmatter.series.slug,
          previous,
          next
        }
      });
    });

    // Create series pages
    const series = data.series.edges;
    series.forEach(series => {
      createPage({
        path: `series/${series.node.slug}`,
        component: seriesPage,
        context: {
          seriesSlug: series.node.slug
        }
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
