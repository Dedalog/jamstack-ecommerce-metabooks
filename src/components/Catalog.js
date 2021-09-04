import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import ListItem from "../components/ListItem"
import { slugify } from "../../utils/helpers"
import InfiniteScroll from "react-infinite-scroll-component"

const Catalog = () => {
  const data = useStaticQuery(graphql`
    query {
      allInventoryInfo {
        nodes {
          price
          name
          authors
          id
          cover {
            url {
              childImageSharp {
                gatsbyImageData(
                  height: 290
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
  `)

  const inventory = data.allInventoryInfo.nodes

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
  )
}

export default Catalog
