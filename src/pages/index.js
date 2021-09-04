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
          <div>
            <Catalog />
          </div>
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
    categoryInfo {
      data {
        name
        image
        itemCount
      }
    }
  }
`

export default Home
