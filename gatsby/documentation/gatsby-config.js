module.exports = {
  siteMetadata: {
    title: 'Website title',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: `${__dirname}/content/`,
      },
    },    
    `gatsby-transformer-remark`,
  ],
}
