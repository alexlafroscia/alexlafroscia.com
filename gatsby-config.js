const title = `TIL by Alex LaFroscia`;

module.exports = {
  siteMetadata: {
    title,
    author: `Alex LaFroscia`,
    siteUrl: `https://alexlafroscia.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data`,
        name: `data`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, posts, allSeries } }) => {
              return posts.nodes.map((post) => {
                let series;

                if (post.frontmatter.series) {
                  series = allSeries.nodes.find(
                    (series) => series.slug === post.frontmatter.series.slug
                  );

                  if (!series) {
                    throw new Error(
                      `Could not find series matching slug: ${post.frontmatter.slug}`
                    );
                  }
                }

                return {
                  title: series
                    ? `${series.name}: ${post.frontmatter.title}`
                    : post.frontmatter.title,
                  description: post.excerpt,
                  date: post.frontmatter.date,
                  url: site.siteMetadata.siteUrl + post.fields.slug,
                  guid: site.siteMetadata.siteUrl + post.fields.slug,
                  custom_elements: [{ 'content:encoded': post.html }], // eslint-disable-line @typescript-eslint/camelcase
                };
              });
            },
            query: `
              {
                posts: allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] }
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                      series {
                        slug
                      }
                    }
                  }
                }

                allSeries: allSeriesYaml {
                  nodes {
                    name
                    slug
                  }
                }
              }
            `,
            output: `/rss.xml`,
            title,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        layout: require.resolve(`./src/layouts/index.tsx`),
      },
    },
  ],
};
