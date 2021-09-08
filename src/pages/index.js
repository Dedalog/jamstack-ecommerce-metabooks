import React from "react"

import SEO from "../components/seo"

import { graphql } from "gatsby"
import Catalog from "../components/Catalog"

const Home = ({ data: gqlData }) => {
  return (
    <>
      <SEO title="Home" />
      <div className="flex flex-col items-center">
        <div className="max-w-fw min-w-full flex flex-col">
          <Catalog />
        </div>
      </div>
    </>
  )
}

export const pageQuery = graphql`
  query {
    navInfo {
      data
    }
  }
`

export default Home
