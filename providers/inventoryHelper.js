export const MERCADOEDITORIAL_ENDPOINT = process.env.MERCADOEDITORIAL_ENDPOINT

export const PUBLISHER_IDS = JSON.parse(process.env.PUBLISHER_IDS)

export class Book {
  book = {}

  constructor(book) {
    this.book.isbn = book.isbn

    this.book.id = this.book.isbn
    this.book.ean = this.book.isbn

    this.book.name = book.titulo
    this.book.subtitle = book.subtitulo

    this.book.authors = this.getAuthors(book.contribuicao)
    this.book.image = book.imagens.imagem_primeira_capa.grande
    this.book.edition = book.edicao

    const { altura, largura, peso, espessura, encadernacao } = book.medidas
    this.book.height = altura
    this.book.width = largura
    this.book.weight = peso
    this.book.thickness = espessura
    this.book.format = encadernacao === "1" ? "Brochura" : "Outros"

    this.book.price = book.preco
    this.book.brand = book.selo.nome_do_selo_editorial
    this.book.description = book.sinopse
    this.book.categories = [book.catalogacao.areas]
    this.book.keywords = book.catalogacao.palavras_chave.split(",")
    this.book.publicationDate = book.data_publicacao
    this.book.currentInventory = 0
  }

  create = () => {
    return this.book
  }

  getAuthors = (contributors) => {
    return contributors
      .map((contributor) => {
        if (contributor.tipo_de_contribuicao === "Autor") {
          return contributor.nome + " " + contributor.sobrenome
        }
      })
      .filter(Boolean)
  }
}
