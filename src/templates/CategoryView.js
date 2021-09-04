import React from "react"
import ListItem from "../components/ListItem"
import { titleIfy, slugify } from "../../utils/helpers"

const CategoryView = (props) => {
  const {
    pageContext: {
      title,
      content: { items = [] },
    },
  } = props
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

export default CategoryView
