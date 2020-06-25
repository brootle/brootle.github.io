module.exports = {
  siteMetadata: {
    title: 'Qencode Documentation',
    description: `Qencode Documentation`,
    author: `Qencode`,    
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },    
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: `${__dirname}/content/`,
      },
    },    
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Qencode Documentation`,
        short_name: `Qencode`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,       
    `gatsby-plugin-lodash`, 
  ],
}
