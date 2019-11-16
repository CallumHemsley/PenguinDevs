/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"

import { rhythm } from "../utils/typography"

const TLDRBio = () => {
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <div
      />
      <p>
      <i>What is the tl;dr section?</i>{' '}
      <hr/>
      <b>tl;dr</b> is a section where I aim to efficiently explain concepts or best practices in as few words as possible.
      </p>
    </div>
  )
}

export default TLDRBio
