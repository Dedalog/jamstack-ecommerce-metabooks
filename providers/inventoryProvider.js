import fs from "fs"
import axios from "axios"
import {
  METABOOKS_ENDPOINT,
  PUBLISHER_IDS,
  getHeader,
  Book,
} from "./inventoryHelper"
import downloadImage, { getImageKey } from "./downloadImage"

async function listBooks_by_publisher_id(publisher_id) {
  const request_type = "metadata"
  const header = getHeader(request_type)
  const endpoint = METABOOKS_ENDPOINT + `/products?search=VL=${publisher_id}`

  let page = 1
  let gtins = []
  let isLastPage = false

  while (isLastPage === false) {
    let fetch_books = await axios.get(endpoint + `&page=${page}`, {
      headers: header,
    })
    let books = fetch_books.data.content

    let currentBatch = books.reduce((approvedBooks, currentBook) => {
      return currentBook.productType === "pbook"
        ? approvedBooks.concat(currentBook.gtin)
        : approvedBooks
    }, [])

    gtins = gtins.concat(currentBatch)

    isLastPage = fetch_books.data.last
    page = page + 1
  }

  console.log(`Total pages fetched: ${page}`)

  return gtins
}

async function getBook(gtin) {
  const request_type = "metadata"
  const header = getHeader(request_type)
  const endpoint = METABOOKS_ENDPOINT + `/product/${gtin}/gtin`

  console.log(endpoint)
  const fetch_book = await axios.get(endpoint, { headers: header })

  const book = fetch_book.data

  return book
}

async function listBooks() {
  return new Promise(async (resolve, reject) => {
    let books_list = []
    let gtins = []

    for (const publisher of PUBLISHER_IDS) {
      gtins = await listBooks_by_publisher_id(publisher)
      books_list = books_list.concat(gtins)
    }

    resolve(books_list)
  })
}

async function getBooks() {
  return new Promise(async (resolve, reject) => {
    let books = []

    const gtin_list = await listBooks()

    for (const gtin of gtin_list) {
      // Metabooks has a bug where every publisher has a kind of
      // placeholder book which should be ignored: 9788585150020
      if (gtin === "9788585150020") continue

      const book = await getBook(gtin)
      books = books.concat(book)
    }

    resolve(books)
  })
}

function translate_catalog(books) {
  return books.map((book) => {
    let entry = new Book(book)

    return entry.create()
    // let entry = {}
    // entry.id = book.identifier
    // entry.categories = ["Catálogo", "Livros"]
    // entry.price = book.priceBrl
    // entry.name = book.title
    // entry.subtitle = book.subTitle
    // entry.author = book.author
    // entry.image = book.coverUrl
    // entry.description = book.mainDescription
    // entry.currentInventory = 0
    // entry.brand = book.publisher
    // entry.keywords = book.keyWords
    // entry.ean = book.isbn.replace(/-/g, "")
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
