import { useStaticQuery, graphql } from "gatsby"
import Fuse from "fuse.js"

export default function useSearch() {
  const data = useStaticQuery(graphql`
    query Search {
      inventoryInfo {
        data {
          name
          ean
          price
          authors
          image
        }
      }
    }
  `)

  const flatProductsData = data.inventoryInfo.data.map((data) => ({
    resultType: "Products",
    id: data.ean,
    ean: data.ean,
    title: data.name,
    price: data.price,
    authors: data.authors,
    image: data.image,
  }))
  const productFuse = new Fuse(flatProductsData, {
    keys: [
      {
        name: "title",
        weight: 2,
      },
      {
        name: "ean",
        weight: 2,
      },
    ],
    distance: 500,
    includeMatches: true,
    includeScore: true,
    minMatchCharLength: 1,
    threshold: 0.3,
  })
  function search(query) {
    const postResults = productFuse.search(query).slice(0, 8)
    return postResults
  }
  return search
}
