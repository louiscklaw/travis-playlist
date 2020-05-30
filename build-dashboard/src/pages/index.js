import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import RepoStatusContainer from '../components/repo-status-container'
import Navbar from '../components/navbar'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Navbar />
    <RepoStatusContainer />
  </Layout>
)

export default IndexPage
