import React from 'react'

import Layout from "../components/layout"
import SEO from "../components/seo"

import Navbar from '../components/navbar'
import BuildFailedCard from '../components/build_failed_card'
import ListOfFailedBranchHeading from '../components/list_of_failed_branches_heading'

import {getFailedBuildJson, getUserRepoWithToken} from '../endpoints/jsons'

import GlobalContext from '../contexts/global'
import TravisTokenForm from '../components/TravisTokenForm'


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

  // let [live_failed_branch, setLiveFailedBranch] = React.useState()
  let [live_user_repo, setLiveUserRepo] = React.useState()

  let {travis_token} = React.useContext(GlobalContext)

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

  React.useEffect(()=>{
    if (typeof travis_token != 'undefined'){
      getUserRepoWithToken(travis_token)
        .then(r => r.json())
        .then(r_json => setLiveUserRepo(r_json))
    }
  },[travis_token])

  return(
    <>
      <Layout>
        <SEO title="travis dashboard" />
        <Navbar />
        <section className="section">
          <div className="container">
            {JSON.stringify(live_user_repo)}
            <div className="columns is-desktop">
              <div className="column">
                <ListOfFailedBranchHeading num_fails={num_fails} num_repos={num_repos} />
              </div>
            </div>
          </div>
        </section>

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