import React from "react"
import { StaticQuery, graphql } from "gatsby"

const mainQuery = graphql`
  query {
    navInfo {
      data
    }
  }
`

const SiteContext = React.createContext()

class ContextProviderComponent extends React.Component {
  addToCart = (ean) => {
    return window.DedalogCommerce.add(ean)
  }

  render() {
    return (
      <StaticQuery query={mainQuery}>
        {(queryData) => {
          return (
            <SiteContext.Provider
              value={{
                navItems: queryData,
                addToCart: this.addToCart,
              }}
            >
              {this.props.children}
            </SiteContext.Provider>
          )
        }}
      </StaticQuery>
    )
  }
}

export { SiteContext, ContextProviderComponent }
