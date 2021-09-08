import React from "react"
import ListItem from "../components/ListItem"
import { titleIfy, slugify } from "../../utils/helpers"
import { graphql } from "gatsby"

const CategoryView = (props) => {
  const items = props.data.allInventoryInfo.nodes
  const title = props.pageContext.title

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-full ax-w-fw flex flex-col">
          <div className="pt-10 pb-8">
            <h1 className="text-5xl font-light">{titleIfy(title)}</h1>
          </div>

          <div>
            <div className="flex flex-1 flex-wrap flex-row">
              {items.map((item, index) => {
                return (
                  <ListItem
                    key={index}
                    link={slugify(item.name)}
                    title={item.name}
                    authors={item.authors}
                    price={item.price}
                    imageSrc={item.cover ? item.cover.url : null}
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

export const query = graphql`
  query ($category: [String]) {
    allInventoryInfo(filter: { categories: { in: $category } }) {
      nodes {
        id
        price
        name
        authors
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

export default CategoryView
