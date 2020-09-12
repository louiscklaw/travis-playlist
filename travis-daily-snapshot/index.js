#!/usr/bin/env node

const fs = require( 'fs' )
const process = require( 'process' )

const fetch = require( 'node-fetch' )

const {getFailedBranchByRepo} = require('./getFailedBranchByRepo')
const {getRepoNameFromBuildsLink}= require('./common')
const {runStatistics} = require('./statistics')

const {
  getRepoNamesFromUser
} = require( './getRepoByUsername' )


function hello(repo_list){
  // console.log(repo_list)
  return Promise.all(
    repo_list.map(repo => getFailedBranchByRepo(repo))
  )
}

// getRepoNamesFromUser( 'louiscklaw' )
var last_builds_failed={}
var number_of_repo=0

Promise.all( [
    getRepoNamesFromUser( 'louiscklaw' )
  ] )
  .then( async values => {
    var repo_list = values[0]
    var repo_slug = repo_list.map(x => x.slug)

    var test = await hello( repo_slug )
    .then( repos_results => {
      return repos_results.filter(repo_result => repo_result.length > 0)
    } )

    number_of_repo = repo_list.length

    return [test,number_of_repo]

  } )
  // .then(values=>{
  //   var failed_list = values[0]
  //   var count_of_repos = values[1]
  //   console.log(count_of_repos)
  // })

  .then( values => {
    var failed_list = values[0]

    failed_list.forEach(failed_by_repo_name => {
      var repo_name = getRepoNameFromBuildsLink(failed_by_repo_name[0])
      var failed_list = failed_by_repo_name
      last_builds_failed[repo_name]=failed_list
    })

  } )
  .then( () => {
    runStatistics(last_builds_failed, number_of_repo)
    // fs.writeFileSync('./answer.json',JSON.stringify(last_builds_failed),{encoding:'utf-8'})
  })
