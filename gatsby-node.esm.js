import getInventory from "./providers/inventoryProvider.js"
import { slugify } from "./utils/helpers"
import { getHeader } from "./providers/inventoryHelper"

const { createRemoteFileNode } = require("gatsby-source-filesystem")
const ItemView = require.resolve("./src/templates/ItemView")
const CategoryView = require.resolve("./src/templates/CategoryView")

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
    type InventoryInfo implements Node {
      cover: productImage
    }
    type productImage @dontInfer {
      url: File @link(by: "url")
    }
  `)
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const { data } = await graphql(`
    query {
      allInventoryInfo {
        nodes {
          id
          price
          name
          subtitle
          authors
          description
          categories
          ean
          weight
          width
          height
          thickness
          edition
          publicationDate
          format
          keywords
          brand
          cover {
            url {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  placeholder: BLURRED
                  formats: [AUTO, WEBP]
                )
              }
            }
          }
        }
      }
    }
  `)

  const inventory = data.allInventoryInfo.nodes

  const inventoryByCategory = inventory.reduce((acc, next) => {
    const categories = next.categories
    categories.forEach((c) => {
      if (acc[c]) {
        acc[c].items.push(next)
      } else {
        acc[c] = {}
        acc[c].items = []
        acc[c].items.push(next)
      }
    })
    return acc
  }, {})

  const categories = Object.keys(inventoryByCategory)

  categories.map(async (category, index) => {
    const previous =
      index === categories.length - 1 ? null : categories[index + 1].node
    const next = index === 0 ? null : categories[index - 1]
    createPage({
      path: slugify(category),
      component: CategoryView,
      context: {
        category: category,
        title: category,
        type: "categoryPage",
        previous,
        next,
      },
    })
  })

  inventory.map(async (item, index) => {
    const previous =
      index === inventory.length - 1 ? null : inventory[index + 1].node
    const next = index === 0 ? null : inventory[index - 1]
    createPage({
      path: slugify(item.name),
      component: ItemView,
      context: {
        ean: item.ean,
        title: item.name,
        type: "itemPage",
        previous,
        next,
      },
    })
  })
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions
  const inventory = await getInventory()

  /* create nav info for categories */

  const inventoryByCategory_temp = inventory.reduce((acc, next) => {
    const categories = next.categories
    categories.forEach((c) => {
      c = c.toLowerCase()
      if (acc[c]) {
        acc[c] += 1
      } else {
        acc[c] = 1
      }
    })
    return acc
  }, {})

  // Get only top 5 categories by item count
  const sorted_categories = Object.keys(inventoryByCategory_temp).sort(
    function (a, b) {
      return inventoryByCategory_temp[b] - inventoryByCategory_temp[a]
    }
  )
  const categoryNames = sorted_categories.slice(0, 5)

  const navData = {
    key: "nav-info",
    data: categoryNames,
  }

  const navNodeContent = JSON.stringify(navData)
  const navNodeMeta = {
    id: createNodeId(`my-data-${navData.key}`),
    parent: null,
    children: [],
    internal: {
      type: `NavInfo`,
      mediaType: `json`,
      content: navNodeContent,
      contentDigest: createContentDigest(navData),
    },
  }

  const navNode = Object.assign({}, navData, navNodeMeta)
  createNode(navNode)

  inventory.forEach((product) => {
    createNode({
      ...product,
      id: createNodeId(`product-${product.ean}`),
      internal: {
        type: `InventoryInfo`,
        mediaType: `json`,
        contentDigest: createContentDigest(product),
      },
    })
  })
}

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  if (node.internal.type === "InventoryInfo") {
    node.cover = await createRemoteFileNode({
      url: node.image,
      parentNodeId: node.id,
      httpHeaders: getHeader("cover"),
      createNode,
      createNodeId,
      cache,
      store,
    })
  }
}
