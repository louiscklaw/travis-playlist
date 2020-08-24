import React from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"

import Navbar from '../components/navbar'

import {getFailedBuildJson} from '../endpoints/jsons'
import BuildFailedCard from '../components/build_failed_card'
import BranchFailStatisticsHeading from '../components/branch_fail_statistics_heading'


function chunkArray(myArray, chunk_size){
  var index = 0;
  var arrayLength = myArray.length;
  var tempArray = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
      let myChunk = myArray.slice(index, index+chunk_size);
      // Do something if you want with the group
      tempArray.push(myChunk);
  }

  return tempArray;
}


function countTotalNumberOfFail(json_in){
  let subtotal = {}
  Object.keys(json_in).forEach(per_repo => subtotal[per_repo] = json_in[per_repo].length)
  return Object.values(subtotal).reduce( (x,y) => x+y)
}

function ListOfFailedBranchPage(props){
  let [test_json, setTestJson] = React.useState([])
  let [chunked_repo_name, setChunkedRepoName] = React.useState([])
  let [num_repos, setNumRepos] = React.useState(0)
  let [num_fails, setNumFails] = React.useState(1)

  React.useEffect(()=>{
    getFailedBuildJson()
      .then(resp => resp.json())
      .then(resp_json => {
        setTestJson(resp_json)
        setChunkedRepoName(chunkArray(Object.keys(resp_json), 6))
        setNumRepos(Object.keys(resp_json).length)
        setNumFails(countTotalNumberOfFail(resp_json))
      })
  },[])

  return(
    <>
      <Layout>
        <SEO title="travis dashboard" />
        <Navbar />

        <section className="section">
          <div className="container">
            <div className="columns is-desktop">
              <div className="column">
                <BranchFailStatisticsHeading num_fails={num_fails} num_repos={num_repos} />
              </div>
            </div>
          </div>

          <div className="container">
            <div className="columns is-desktop">
              <div className="column">
                content
              </div>
            </div>
          </div>
        </section>

      </Layout>
    </>
  )
}

export default ListOfFailedBranchPage