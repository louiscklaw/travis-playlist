import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import RepoStatusContainer from '../components/repo-status-container'
import Navbar from '../components/navbar'

function IndexPage(){
  let modal_ref = React.useRef()

  return (
    <Layout>
      <SEO title="travis dashboard" />
      <Navbar />
      <RepoStatusContainer />

    </Layout>
  )

}

export default IndexPage
