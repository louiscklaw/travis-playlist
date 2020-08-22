import React from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"

import Navbar from '../components/navbar'

import {getFailedBuildJson} from '../endpoints/jsons'
import BuildFailedCard from '../components/build_failed_card'

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


function ListOfFailedBranchPage(props){
  let [test_json, setTestJson] = React.useState([])
  let [chunked_repo_name, setChunkedRepoName] = React.useState([])

  React.useEffect(()=>{
    getFailedBuildJson()
      .then(resp => resp.json())
      .then(resp_json => {
        setTestJson(resp_json)
        setChunkedRepoName(chunkArray(Object.keys(resp_json), 6))
      })
  },[])

  return(
    <>
      <Layout>
        <SEO title="travis dashboard" />
        <Navbar />
          <h1 className="title is-3">list of failed branches</h1>

          {chunked_repo_name.map(chunk => {
            return(
              <div className="columns is-desktop">

                {chunk.map(repo_name => {
                  return (
                    <div className="column">
                      <BuildFailedCard repo_name={repo_name} content={test_json[repo_name]} />
                    </div>
                  )
                })}

              </div>
            )
          })}



            {/* <div className="column">
              <BuildFailedCard repo_name={`repo_name`} content={`test_json[repo_name]`} />
            </div>

          </div> */}

          {/* {Object.keys(test_json).map( repo_name => {
            return(
              <BuildFailedCard repo_name={repo_name} content={test_json[repo_name]} />
            )
          })} */}


      </Layout>
    </>
  )
}

export default ListOfFailedBranchPage