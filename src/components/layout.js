import React from "react"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import Footer from "./Footer";
import "./layout.css";

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header
    let footer = null;

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

      footer = <Footer />
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
        {footer}
      </div>
    )
  }
}

export default Layout
