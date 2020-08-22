#!/usr/bin/env node

const fs = require( 'fs' )
const process = require( 'process' )

const fetch = require( 'node-fetch' )

const {getFailedBranchByRepo} = require('./getFailedBranchByRepo')
const {getRepoNameFromBuildsLink}= require('./common')

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

Promise.all( [
    getRepoNamesFromUser( 'louiscklaw' )
  ] )
  .then( values => {
    var repo_list = values[0].map(x => x.slug)

    return hello( repo_list )
      .then( repos_results => {
        return repos_results.filter(repo_result => repo_result.length > 0)
      } )
  } )
  .then( failed_list => {
    // console.log(haha)
    failed_list.forEach(failed_by_repo_name => {
      var repo_name = getRepoNameFromBuildsLink(failed_by_repo_name[0])
      var failed_list = failed_by_repo_name
      last_builds_failed[repo_name]=failed_list
    })
  } )
  .then( () => {
    fs.writeFileSync('./answer.json',JSON.stringify(last_builds_failed),{encoding:'utf-8'})
  })