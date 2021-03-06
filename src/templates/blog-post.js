import React from "react"
import { Link, graphql } from "gatsby"
import { Disqus } from 'gatsby-plugin-disqus'
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Signup from "../components/Signup";
import { rhythm, scale } from "../utils/typography"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next, slug } = this.props.pageContext
    
    let disqusConfig = {
      url: "https://penguindevs.xyz" + this.props.location.pathname,
      identifier: post.id,
      title: post.frontmatter.title,
    }


    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          slug={slug}
        />
        <article>
          <header>
            <h1
              style={{
                //fontFamily: "Libre Baskerville",
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {post.frontmatter.title}
            </h1>
            <time
              style={{
                //...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
              }}
            >
              {post.frontmatter.date}
            </time>
          </header>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <Signup />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <footer>
            <Disqus config={disqusConfig}/>

            <h3
              style={{
                color: "#00c918",
                marginBottom: rhythm(0.75),
                marginTop: 0,
              }}
              id="smallTitleHeader"
            >
              <Link
                style={{
                  boxShadow: `none`,
                  textDecoration: `none`,
                  color: `inherit`,
                  
                }}
                to={`/`}
              >
                Penguin Devs
              </Link>
            </h3>
            <Bio />
          </footer>
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(
      fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
