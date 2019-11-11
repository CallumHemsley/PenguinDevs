import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class Contact extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Contact" />
        <h1 style={{fontFamily: "Libre Baskerville"}}>Contact</h1>
        <p>Feel free to <a href="mailto:cthemsley@gmail.com">email</a> me.</p>
        <a
          href="https://mobile.twitter.com/penguindevs"
          target="_blank"
          rel="noopener noreferrer"
        >Twitter
        </a>{' '}
        &bull;{' '}
        <a
          href="https://github.com/CallumHemsley"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>{' '}
        &bull;{' '}
        <a
          href="https://instagram.com/penguindevs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>{' '}
        &bull;{' '}
        <a
          href="https://www.linkedin.com/in/callum-hemsley-308121178/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </Layout>
    )
  }
}

export default Contact

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }`