import React from "react"

import SEO from "../components/seo"
import ListItem from "../components/ListItem"
import { slugify } from "../../utils/helpers"

import { graphql } from "gatsby"

const Home = ({ data: gqlData }) => {
  const { allInventoryInfo } = gqlData
  const inventory = allInventoryInfo.nodes

  return (
    <>
      <SEO title="Home" />
      <div className="flex flex-col items-center">
        <div className="max-w-fw min-w-full flex flex-col">
          <div>
            <div className="flex flex-1 flex-wrap flex-row">
              {inventory.map((item, index) => {
                return (
                  <ListItem
                    key={index}
                    link={slugify(item.name)}
                    title={item.name}
                    authors={item.authors}
                    price={item.price}
                    imageSrc={item.cover.url}
                  />
                )
              })}
            </div>
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
    allInventoryInfo {
      nodes {
        price
        brand
        name
        authors
        categories
        description
        ean
        id
        cover {
          url {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
          }
        }
      }
    }
  }
`

export default Home
