import React, { useState } from "react"

import SEO from "../components/seo"
import ListItem from "../components/ListItem"
import { slugify } from "../../utils/helpers"
import InfiniteScroll from "react-infinite-scroll-component"

import { graphql } from "gatsby"

const Home = ({ data: gqlData }) => {
  const { allInventoryInfo } = gqlData
  const inventory = allInventoryInfo.nodes

  const showItems = 20
  const [sliceItems, setSliceItems] = useState(showItems)
  const [hasMore, setHasMore] = useState(true)

  const fetchData = () => {
    setSliceItems(sliceItems + showItems)
    if (inventory.length <= sliceItems + showItems) {
      setHasMore(false)
    }
  }

  return (
    <>
      <SEO title="Home" />
      <div className="flex flex-col items-center">
        <div className="max-w-fw min-w-full flex flex-col">
          <div>
            <InfiniteScroll
              dataLength={sliceItems}
              next={fetchData}
              hasMore={hasMore}
              className="flex flex-1 flex-wrap flex-row"
            >
              {inventory.slice(0, sliceItems).map((item, index) => {
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
            </InfiniteScroll>
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
