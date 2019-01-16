module.exports = {
  siteMetadata: {
    title: `TIL by Alex LaFroscia`,
    author: `Alex LaFroscia`,
    siteUrl: `https://alexlafroscia.com`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/blog`,
        name: `blog`
      }
    },
    `gatsby-transformer-remark`
  ]
};
