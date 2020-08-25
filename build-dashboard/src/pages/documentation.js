import React from 'react'

import Layout from "../components/layout"
import SEO from "../components/seo"

import Navbar from '../components/navbar'


function DocumentationPage(props){

  return(
    <Layout>
      <SEO title="travis dashboard" />
      <Navbar />
      <section className="section">
        <div className="container">
          <div className="columns is-desktop">
            <div className="column">
              DocumentationHeading
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default DocumentationPage