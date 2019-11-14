const title = `TIL by Alex LaFroscia`;

module.exports = {
  siteMetadata: {
    title,
    author: `Alex LaFroscia`,
    siteUrl: `https://alexlafroscia.com`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/blog`,
        name: `blog`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
          `gatsby-remark-copy-linked-files`
        ]
      }
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data`,
        name: `data`
      }
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
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }]
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: `/rss.xml`,
            title
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-fathom',
      options: {
        siteId: 'NHEVCYHO'
      }
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        layout: require.resolve(`./src/layouts/index.tsx`)
      }
    }
  ]
};
