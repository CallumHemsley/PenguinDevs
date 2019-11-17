const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const blogResult = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: {regex : "\/blog/"} },
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
              }
            }
          }
        }
      }
    `
  )

  const tldrResult = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: {regex : "\/tldr/"} },
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
              }
            }
          }
        }
      }
    `
  )

  if (blogResult.errors) {
    throw blogResult.errors
  }

  // Create blog posts pages.
  const posts = blogResult.data.allMarkdownRemark.edges

  const tldrPosts = tldrResult.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node

    
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        filterS: post.node.fields.type,
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
  
  tldrPosts.forEach((post, index) => {
    const previous = index === tldrPosts.length - 1 ? null : tldrPosts[index + 1].node

    
    const next = index === 0 ? null : tldrPosts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        filterS: post.node.fields.type,
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
