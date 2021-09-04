/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { Link } from "gatsby"
import { SiteContext, ContextProviderComponent } from "../context/mainContext"
import { titleIfy, slugify } from "../../utils/helpers"
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify"
import { colors } from "../theme"
import logo from "../images/logo.png"
import Search from "../components/Search"

toast.configure({
  progressStyle: {
    background: colors.primary,
  },
})

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: "",
    }
  }

  componentDidMount() {
    const script = document.createElement("script")
    script.setAttribute(
      "src",
      "https://cdn.dedalog.com.br/dedalog-commerce_z2LQp2owuzaK6HU4LsbLAQc3RGufa9eniQM2H6pKGMqQ8QHbJg_v2.js"
    )
    script.setAttribute(
      "onLoad",
      `DedalogCommerce.configure({generateButtons: true});DedalogCommerce.create("${process.env.GATSBY_DEDALOG_COMMERCE_APIKEY}");`
    )
    script.setAttribute("type", "text/javascript")
    script.setAttribute("charset", "utf8")
    window.document.body.appendChild(script)
  }

  render() {
    const { children } = this.props

    return (
      <ContextProviderComponent>
        <SiteContext.Consumer>
          {(context) => {
            let {
              navItems: {
                navInfo: { data: links },
              },
            } = context

            links = links.map((link) => ({
              name: titleIfy(link),
              link: "/" + slugify(link),
            }))
            links.unshift({
              name: "Home",
              link: "/",
            })

            return (
              <>
                <div className="min-h-screen">
                  <nav>
                    <div className="flex justify-center items-center">
                      <div className="w-fw items-center mobile:px-10 desktop:px-10 mb-3 px-4 pt-10 pb-6 flex flex-col sm:flex-row">
                        <Link to="/">
                          <img
                            className="mb-0 w-52 sm:mr-16"
                            alt="Logo"
                            src={logo}
                          />
                        </Link>

                        <div className="relative rounded-md shadow-sm flex-grow mr-7">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                              className="h-5 w-5 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            placeholder="Pesquisar livros"
                            value={this.state.search}
                            className="w-full shadow appearance-none border-2 rounded py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500 transition duration-500 ease-in-out"
                            onChange={(e) =>
                              this.setState({ search: e.target.value })
                            }
                            onBlur={(e) => {
                              this.state.search = ""
                            }}
                          />
                        </div>

                        <div className="flex pr-4">
                          <div id="dedalog-commerce"></div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-5 flex justify-center">
                      <div className="w-fw items-center mobile:px-10 desktop:px-10 px-4 flex flex-col sm:flex-row justify-between ">
                        {links.map((l, i) => (
                          <Link to={l.link} key={i}>
                            <p
                              key={i}
                              className="text-left uppercase m-0 text-smaller mr-4 sm:mr-8 font-semibold"
                            >
                              {l.name}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </nav>
                  <div className="mobile:px-10 px-4 pb-10 flex justify-center">
                    <main className="w-fw">
                      {this.state.search !== "" ? (
                        <Search term={this.state.search} />
                      ) : (
                        children
                      )}
                    </main>
                  </div>
                  <footer className="flex justify-center">
                    <div className="flex w-fw px-8 desktop:px-0 border-solid border-t border-gray-300 items-center">
                      <span className="block text-gray-700 pt-4 pb-8 mt-2 text-xs">
                        Copyleft © 2021{" "}
                        <a href="https://dedalog.com.br/">
                          Dadalog Commerce Platform.
                        </a>
                      </span>
                    </div>
                  </footer>
                </div>
              </>
            )
          }}
        </SiteContext.Consumer>
      </ContextProviderComponent>
    )
  }
}

export default Layout
