export const METABOOKS_ENDPOINT = process.env.METABOOKS_ENDPOINT

const METABOOKS_API_KEYS = {
  metadata: process.env.METABOOKS_API_KEYS_METADATA,
  mmo: process.env.METABOOKS_API_KEYS_MMO,
  cover: process.env.METABOOKS_API_KEYS_COVER,
}

export const PUBLISHER_IDS = JSON.parse(process.env.PUBLISHER_IDS)

export const getHeader = type => {
  let header = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${METABOOKS_API_KEYS[type]}`,
  }

  return header
}

export class Book {
  book = {}

  constructor(book) {
    this.book.isbn = this.getISBN(book.identifiers)

    this.book.id = this.book.isbn
    this.book.ean = this.book.isbn

    const { title, subtitle } = this.getTitle_Subtitle(book.titles)
    this.book.name = title
    this.book.subtitle = subtitle

    this.book.authors = this.getAuthors(book.contributors)
    this.book.image = `${METABOOKS_ENDPOINT}/cover/${this.book.isbn}/l`
    this.book.edition = book.edition.editionNumber

    const { height, width, weight, thickness } = book.form
    this.book.height = height
    this.book.width = width
    this.book.weight = weight
    this.book.thickness = thickness

    this.book.format = book.form.productForm === "BB" ? "Capa Dura" : "Brochura"
    this.book.price = book.prices[0].priceAmount
    this.book.brand = book.publishers[0].publisherName
    this.book.description = this.getDescription(book.textContents)
    this.book.categories = [this.getMainCategory(book.subjects)].filter(Boolean)
    this.book.keywords = this.getKeywords(book.subjects)
    this.book.publicationDate = book.publicationDate
    this.book.currentInventory = 0
  }

  create = () => {
    return this.book
  }

  getDescription = textContents => {
    return textContents
      .map(textContent => {
        if (textContent.textType === "03") {
          return textContent.text
        }
      })
      .filter(Boolean)[0]
  }

  getISBN = identifiers => {
    return identifiers
      .map(identifier => {
        if (identifier.productIdentifierType === "15") {
          return identifier.idValue
        }
      })
      .filter(Boolean)[0]
  }

  getAuthors = contributors => {
    return contributors
      .map(contributor => {
        if (contributor.contributorRole === "A01") {
          return contributor.firstName + " " + contributor.lastName
        }
      })
      .filter(Boolean)
  }

  getTitle_Subtitle = titles => {
    return titles
      .map(title => {
        if (title.titleType === "01") {
          return { title: title.title, subtitle: title.subtitle }
        }
      })
      .filter(Boolean)[0]
  }

  getMainCategory = subjects => {
    return subjects
      .map(subject => {
        if (
          subject.mainSubject === true &&
          subject.subjectSchemeIdentifier === "93" &&
          subject.hasOwnProperty("subjectHeadingText")
        ) {
          return subject.subjectHeadingText
        }
      })
      .filter(Boolean)[0]
  }

  getKeywords = subjects => {
    return subjects
      .map(subject => {
        if (
          subject.subjectSchemeIdentifier === "20" &&
          subject.hasOwnProperty("subjectHeadingText")
        ) {
          return subject.subjectHeadingText
        }
      })
      .filter(Boolean)
  }
}
