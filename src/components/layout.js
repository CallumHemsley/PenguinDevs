import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import "./layout.css";

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

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
            <img style={{marginBottom: 0, marginLeft: "6px"}} src="http://icooon-mono.com/i/icon_14423/icon_144230_256.png" height="25" alt="a penguin"></img>
          </h1>
        </>
      )
    } else {
      header = (
        <h3
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
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer id="footer">
          © {new Date().getFullYear()}, Callum Hemsley
        </footer>
      </div>
    )
  }
}

export default Layout
