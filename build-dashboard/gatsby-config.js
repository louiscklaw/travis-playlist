module.exports = {
  siteMetadata: {
    title: `travis dashboard`,
    titleTemplate: "%s · louiscklaw.github.io",
    description: `A simple travis dashboard for louis`,
    author: `@louiscklaw`,
    url: "https://louiscklaw.github.io/travis-playlist", // No trailing slash allowed!
    image: "/images/screenshot.jpg", // Path to your image you placed in the 'static' folder
    twitterUsername: "@louiscklaw",
  },
  pathPrefix: "/travis-playlist",
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
