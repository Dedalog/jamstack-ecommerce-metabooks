import React from "react"
import { Link } from "gatsby"
import { numberFormat } from "../../utils/helpers"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const ListItem = ({ link, title, authors, imageSrc, price }) => (
  <div
    className="
    w-100
    md:w-1/3
    lg:w-1/5
    p1 sm:p-2
  "
  >
    <Link to={`/${link}`}>
      <div className="flex justify-center items-center hover:bg-light-200">
        <GatsbyImage
          alt={title}
          className="max-h-64 flex flex-column justify-center items-center"
          imgClassName="mb-0 w-8/12"
          objectFit="contain"
          image={getImage(imageSrc)}
        />
      </div>
    </Link>
    <div>
      <p className="m-3 text-center text-l font-semibold mb-0">{title}</p>

      {authors ? (
        <p className="text-center text-xs mb-1">{authors.join(", ")}</p>
      ) : null}

      <p className="text-center text-xs text-gray-700 mb-4">
        {numberFormat(price)}
      </p>
    </div>
  </div>
)

export default ListItem
