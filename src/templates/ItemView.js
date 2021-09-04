import React, { useState } from "react"
import SEO from "../components/seo"

import { SiteContext, ContextProviderComponent } from "../context/mainContext"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Button from "../components/Button"

const ItemView = (props) => {
  const item = props.pageContext.content
  const {
    price,
    cover,
    name,
    subtitle,
    authors,
    description,
    ean,
    weight,
    width,
    height,
    thickness,
    edition,
    publicationDate,
    format,
    keywords,
    brand,
  } = item
  const {
    context: { addToCart },
  } = props

  const [loading, setLoading] = useState(false)

  async function addItemToCart(item) {
    setLoading(true)
    await addToCart(item)
    setLoading(false)
  }

  return (
    <>
      <SEO title={name} />
      <div
        className="pt-12 flex flex-1 flex-col
      md:flex-row
      w-full
      my-0 mx-auto"
      >
        <div className="w-full md:w-1/2 h-112 flex flex-1 bg-light hover:bg-light-200">
          <GatsbyImage
            alt={name}
            className="my-8 p10 flex flex-1 justify-center items-center"
            imgClassName="m-0 max-h-96 w-auto"
            objectFit="contain"
            image={getImage(cover.url)}
          />
        </div>
        <div className="pt-2 px-0 md:px-10 pb-8 w-full md:w-1/2">
          {authors ? (
            <p className="text-l tracking-tighter mb-1">{authors.join(", ")}</p>
          ) : null}
          <h1 className="text-5xl font-light">{name}</h1>
          {subtitle ? (
            <h2 className="text-3xl font-light">{subtitle}</h2>
          ) : null}
          <h2 className="text-2xl tracking-tighter">
            {parseFloat(price).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </h2>

          <p className="text-xs tracking-tighter mb-1">ISBN: {ean}</p>
          <p className="text-xs tracking-tighter mb-1">Selo: {brand}</p>
          <p className="text-xs tracking-tighter mb-1">Peso: {weight} gramas</p>
          <p className="text-xs tracking-tighter mb-1">
            Tamanho: {width} x {height} x {thickness} mm
          </p>
          <p className="text-xs tracking-tighter mb-1">Edição: {edition}ª</p>
          <p className="text-xs tracking-tighter mb-1">
            Lançamento: {publicationDate}
          </p>
          <p className="text-xs tracking-tighter">Encadernação: {format}</p>

          <p className="text-gray-600 text-sm">{description}</p>
          {loading}
          <Button
            full
            title={
              loading ? (
                <svg
                  className="animate-spin h-5 w-5 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Adicionar ao carrinho"
              )
            }
            onClick={() => addItemToCart(item)}
          />

          <p className="mt-16 text-gray-500 text-xs">
            Palavras-chave: {keywords.join(", ")}
          </p>
        </div>
      </div>
    </>
  )
}

function ItemViewWithContext(props) {
  return (
    <ContextProviderComponent>
      <SiteContext.Consumer>
        {(context) => <ItemView {...props} context={context} />}
      </SiteContext.Consumer>
    </ContextProviderComponent>
  )
}

export default ItemViewWithContext
