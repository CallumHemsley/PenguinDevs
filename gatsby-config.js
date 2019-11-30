module.exports = {
  siteMetadata: {
    title: `Penguin Devs`,
    author: `Callum Hemsley`,
    description: `Personal blog by Callum Hemsley. Showcasing my thoughts and experiences coding.`,
    siteUrl: `https://penguindevs.xyz`,
    image: "/content/assets/profile.picture.jpg",
    social: {
      twitter: `@penguindevs`,
    },
  },
  pathPrefix: "/",
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/tldr`,
        name: `tldr`,
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `penguindevs-1`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
          endpoint: 'https://xyz.us4.list-manage.com/subscribe/post?u=a802a3c7657122087f9c15d6b&amp;id=dfeed8f8e2', // add your MC list endpoint here; see instructions below
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false,
            },
          },
          'gatsby-remark-images-medium-zoom',
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '÷',
              classPrefix: "language-",
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-123770507-1`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Penguin Devs`,
        short_name: `PenguinDevs`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/penguin.png`,
        theme_color_in_head: false
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://penguindevs.xyz`,
      },
    },
    `gatsby-plugin-feed`,
    `gatsby-remark-social-cards`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sitemap`,
  ],
}
