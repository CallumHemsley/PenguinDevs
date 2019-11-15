/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { Link } from "gatsby"

import { rhythm } from "../utils/typography"

const Header = (props) => {
    let header;
    const data = useStaticQuery(graphql`
    query IconQuery {
      avatar: file(absolutePath: { regex: "/penguin.png/" }) {
        childImageSharp {
          fixed(width: 25, height: 25) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  const { location, title } = props;
  const rootPath = `${__PATH_PREFIX__}/`;
  if (location.pathname === rootPath) {
    header = (
      <>
        <h1
          id="titleHeader"
          style={{
            marginBottom: rhythm(0.75),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
          <Image
            fixed={data.avatar.childImageSharp.fixed}
            alt="pic of penguin"
            style={{
              marginLeft: "6px",
              marginBottom: 0,
            }}
          />
        </h1>
      </>
    )
  } else {
    header = (
      <h3
        style={{color: "#00c918"}}
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
          {title}
        </Link>
      </h3>
    )
  }

  return header;
}

export default Header
