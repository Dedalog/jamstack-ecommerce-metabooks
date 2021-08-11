import fs from "fs"
import axios from "axios"
import {
  MERCADOEDITORIAL_ENDPOINT,
  PUBLISHER_IDS,
  Book,
} from "./inventoryHelper"
import downloadImage, { getImageKey } from "./downloadImage"

async function listBooks_by_publisher_id(publisher_id) {
  const endpoint =
    MERCADOEDITORIAL_ENDPOINT + `/book?codigo_selos=${publisher_id}`

  let page = 1
  let books = []
  let isLastPage = false

  while (isLastPage === false) {
    let fetch_books = await axios.get(endpoint + `&page=${page}`)
    books = books.concat(fetch_books.data.books)

    isLastPage = Boolean(
      fetch_books.data.navigation.page ===
        fetch_books.data.navigation.total_pages
    )
    page = page + 1
  }

  console.log(`Total pages fetched: ${page}`)

  return books
}

async function listBooks() {
  return new Promise(async (resolve, reject) => {
    let books_list = []
    let books = []

    for (const publisher of PUBLISHER_IDS) {
      books = await listBooks_by_publisher_id(publisher)
      books_list = books_list.concat(books)
    }

    resolve(books_list)
  })
}

async function getBooks() {
  return new Promise(async (resolve, reject) => {
    const books = await listBooks()
    resolve(books)
  })
}

function translate_catalog(books) {
  return books.map((book) => {
    let entry = new Book(book)

    return entry.create()
  })
}

async function downloadCovers(catalog) {
  await Promise.all(
    catalog.map(async (item, index) => {
      try {
        const imageKey = item.id
        const relativeUrl = `../downloads/${imageKey}`
        if (!fs.existsSync(`${__dirname}/public/downloads/${imageKey}`)) {
          await downloadImage(item.image, imageKey)
        }
        catalog[index].image = relativeUrl
      } catch (err) {
        console.log("error downloading image: ", err)
      }
    })
  )
}

async function getInventory() {
  return new Promise(async (resolve, reject) => {
    const get_catalog = await getBooks()
    const catalog = translate_catalog(get_catalog)
    console.log(`Finished collecting all ${catalog.length} books metadata`)

    await downloadCovers(catalog)
    console.log("Finished downloading book images")

    resolve(catalog)
  })
}

/*
Inventory items must adhere to the following schema:

type Product {
  id: ID!
  categories: [String]!
  price: Float!
  name: String!
  subtitle: String!
  author: String!
  image: String!
  description: String!
  currentInventory: Int!
  brand: String!
  keywords: [String]!
  ean: String
}
*/

const DENOMINATION = "$"

export { DENOMINATION, getInventory as default }
