import React, { useState } from "react"
import Popup from "reactjs-popup"
import SEO from "../components/seo"

import { SiteContext, ContextProviderComponent } from "../context/mainContext"
import Button from "../components/Button"
import Image from "../components/Image"

const ItemView = props => {
  const item = props.pageContext.content
  const {
    price,
    image,
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

  function addItemToCart(item) {
    addToCart(item)
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
          <div className="py-16 p10 flex flex-1 justify-center items-center">
            <Popup
              modal
              trigger={
                <img
                  src={image}
                  className="m-0 max-h-96 w-auto"
                  alt="Inventory item"
                />
              }
            >
              <Image src={image} alt="Inventory item" />
            </Popup>
          </div>
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
          <Button
            full
            title="Adicionar ao carrinho"
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
        {context => <ItemView {...props} context={context} />}
      </SiteContext.Consumer>
    </ContextProviderComponent>
  )
}

export default ItemViewWithContext
