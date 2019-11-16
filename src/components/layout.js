import React from "react"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import Footer from "./Footer";
import "./layout.css";
import Header from "./Header";

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let footer = (location.pathname === rootPath || location.pathname === "/tldr") ? <Footer /> : null;

    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>
          <Header location={location} title={title} />
        </header>
        <main>{children}</main>
        {footer}
      </div>
    )
  }
}

export default Layout
