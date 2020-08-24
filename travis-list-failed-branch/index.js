#!/usr/bin/env node

// curl \
// -H "Travis-API-Version: 3" \
// -H "User-Agent: API Explorer" \
// -H "Authorization: token ${TRAVIS_AUTH_TOKEN}" \
// https://api.travis-ci.com/builds

const fs = require( 'fs' )
const process = require( 'process' )

const fetch = require( 'node-fetch' )

const { getRepoNameFromBuildsLink }= require('./common')
const { getFailedBranchByRepo } = require('./getFailedBranchByRepo')
const { getRepoNamesFromUser } = require( './getRepoByUsername' )
const {runStatistics} = require('./statistics')
const {addRecord, updateBuildFaliledList} = require('./update_db')

// getRepoNamesFromUser( 'louiscklaw' )
var last_builds_failed={}


function hello(repo_list){
  // console.log(repo_list)
  return Promise.all(
    repo_list.map(repo => getFailedBranchByRepo(repo))
  )
}

Promise.all( [
  // getRepoNamesFromUser( 'louiscklaw', true )
  getRepoNamesFromUser( 'louiscklaw' )
] )
  .then( values => {
    var repo_list = values[0].map(x => x.slug)

    return hello( repo_list )
    .then( repos_results => {
      return repos_results.filter(repo_result => repo_result.length > 0)
    } )
  })
  .then( failed_list => {
    // console.log(haha)
    failed_list.forEach(failed_by_repo_name => {
      var repo_name = getRepoNameFromBuildsLink(failed_by_repo_name[0])
      var failed_list = failed_by_repo_name
      last_builds_failed[repo_name]=failed_list
    })

    console.log(last_builds_failed)

    updateBuildFaliledList(last_builds_failed)
    addRecord(runStatistics(last_builds_failed))

  } )
