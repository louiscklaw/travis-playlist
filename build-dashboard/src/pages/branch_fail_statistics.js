import React from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"

import Navbar from '../components/navbar'
import BranchFailStatisticsHeading from '../components/branch_fail_statistics_heading'
// import TestLine from '../components/line-chart'
import BranchFailLineChart from '../components/branch_fail_line_chart'



function BranchFailStatisticsPage(props){

  return(
    <Layout>
      <SEO title="travis dashboard" />
      <Navbar />
      <section className="section">
        <div className="container">
          <div className="columns is-desktop">
            <div className="column">
              <BranchFailStatisticsHeading />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="columns is-desktop">
            <div className="column is-full">
              <BranchFailLineChart />
            </div>
          </div>
        </div>
      </section>

    </Layout>
  )
}

export default BranchFailStatisticsPage
