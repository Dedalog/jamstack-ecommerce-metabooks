import React from "react"
import useSearch from "./useSearch"
import { slugify } from "../../../utils/helpers"
import ListItem from "../ListItem"

export default function Search({ term }) {
  const search = useSearch()
  const results = search(term)
  const Results = () => {
    const RenderedItems = []

    results.forEach((result) => {
      let item = result.item

      RenderedItems.push(
        <ListItem
          key={item.ean}
          link={slugify(item.title)}
          title={item.title}
          authors={item.authors}
          price={item.price}
          imageSrc={item.image}
        />
      )
    })

    return RenderedItems
  }

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-fw min-w-full flex flex-col">
        <div>
          <div className="flex flex-1 flex-wrap flex-row">
            <Results />
          </div>
        </div>
      </div>
    </div>
  )
}
