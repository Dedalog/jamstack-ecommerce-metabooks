import React from "react"
import { Link } from "gatsby"
import { numberFormat } from "../../utils/helpers"
import Image from "./Image"

const ListItem = ({ link, title, authors, imageSrc, price }) => (
  <div
    className="
    w-100
    md:w-1/2
    lg:w-1/4
    p1 sm:p-2
  "
  >
    <Link to={`/${link}`}>
      <div className="h-72 flex justify-center items-center bg-light hover:bg-light-200">
        <div className="flex flex-column justify-center items-center">
          <Image alt={title} src={imageSrc} className="max-h-112 mb-0 w-3/5" />
        </div>
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
