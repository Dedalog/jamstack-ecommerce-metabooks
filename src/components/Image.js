import React, { useState, useEffect } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

async function fetchImage(src, updateSrc) {
  // const image = await S3.getimage(src)
  updateSrc(src)
}

const Image = ({ src, ...props }) => {
  const [imageSrc, updateSrc] = useState(null)
  useEffect(() => {
    fetchImage(src, updateSrc)
  }, [])

  return imageSrc ? (
    <GatsbyImage {...props} objectFit="contain" image={getImage(imageSrc)} />
  ) : null
}

export default Image
