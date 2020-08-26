import React from 'react'

import Layout from "../components/layout"
import SEO from "../components/seo"

import Navbar from '../components/navbar'

import GlobalContext from '../contexts/global'
import {getUserAllRepoWithToken} from '../endpoints/jsons'
import { getFailedBranchByRepo } from '../endpoints/jsons'
import { getRepoNameFromBuildsLink } from '../endpoints/jsons'
import BuildFailedCard from '../components/build_failed_card'

import ListOfFailedBranchLiveHeading from '../components/list_of_failed_branches_live_heading'

function fetchRepoLastBuildStatus(repo_list, travis_token_in){
  return Promise.all(repo_list.map(repo => getFailedBranchByRepo(repo, travis_token_in)))
}

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

function ShowRepoCards(props){
  let {show_repo_name, last_builds_failed} = props
  return (
    <>
      {
        show_repo_name.map(chunk => {
          return(
            <div className="columns is-desktop">
              {
                chunk.map(repo_name => {
                  return(
                    <div className="column">
                      <BuildFailedCard repo_name={repo_name} content={last_builds_failed[repo_name]} />
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </>
  )
}

function ListUserRepoPage(props){
  let {travis_token} = React.useContext(GlobalContext)
  let [content , setContent] = React.useState()
  let [chunked_repo_name, setChunkedRepoName] = React.useState([])
  let [show_repo_name, setShowRepoName] = React.useState([])
  let [last_builds_failed, setLastBuildsFailed] = React.useState({})

  let [repo_filter, setRepoFilter] = React.useState('')

  let [test_debug, setTestDebug] = React.useState()

  function handleFilterOnChange(e){
    let filter_text = e.target.value.trim()
    setRepoFilter(filter_text)
  }

  React.useEffect(()=>{
    var last_builds_failed={}

    if (typeof travis_token != 'undefined'){
      setContent('loading')

      Promise.all([
        getUserAllRepoWithToken(travis_token, true)
      ])
      .then(values => {
        var repo_list = values[0].map(x => x.slug)

        // ['louiscklaw/hkstock-digest','louiscklaw/hkstock-digest','louiscklaw/Appimage', 'louiscklaw/kicad_config']

        return fetchRepoLastBuildStatus(repo_list, travis_token)
          .then( repos_results => {
            return repos_results.filter(repo_result => repo_result.length > 0)
          } )

      })
      .then( failed_list => {
        let output={}
        failed_list.forEach(failed_by_repo_name => {
          var repo_name = getRepoNameFromBuildsLink(failed_by_repo_name[0])
          var failed_list = failed_by_repo_name
          last_builds_failed[repo_name]=failed_list
          output[repo_name]=failed_list
        })
        return output
      })
      .then((failed_list) => {
        setLastBuildsFailed(failed_list)
        // setChunkedRepoName(chunkArray(Object.keys(failed_list), 6))
        setShowRepoName(chunkArray(Object.keys(failed_list), 6))
      })
    }
  },[travis_token])

  React.useEffect(()=>{
    // debug:
    // setTestDebug(Object.keys(last_builds_failed).filter( x => x.search(repo_filter) > -1))

    let repo_to_show = Object.keys(last_builds_failed).filter( x => x.search(repo_filter) > -1)

    setShowRepoName(chunkArray(repo_to_show, 6))

  },[repo_filter, last_builds_failed])

  return(
    <>
      <Layout>
      <SEO title="travis dashboard" />
        <Navbar />
        <section className="section">
          <div className="container">
            <ListOfFailedBranchLiveHeading  />
            <input type="text" placeholder="repo filter" onChange={e=>handleFilterOnChange(e)} value={repo_filter} />
          </div>
        </section>
        {JSON.stringify(test_debug)}
        <ShowRepoCards show_repo_name={show_repo_name} last_builds_failed={last_builds_failed} />

      </Layout>
    </>
  )
}

export default ListUserRepoPage