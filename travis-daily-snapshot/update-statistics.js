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
var number_of_repo=0

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
  .then( async values => {
    var repo_list = values[0]
    var repo_slug = repo_list.map(x => x.slug)


    var test = await hello( repo_slug )
    .then( repos_results => {
      return repos_results.filter(repo_result => repo_result.length > 0)
    } )

    number_of_repo = repo_list.length

    return [test,number_of_repo]
  })
  .then( values => {
    var failed_list = values[0]

    failed_list.forEach(failed_by_repo_name => {
      var repo_name = getRepoNameFromBuildsLink(failed_by_repo_name[0])
      var failed_list = failed_by_repo_name
      last_builds_failed[repo_name]=failed_list
    })

  } )
  .then(() => {
    // NOTE: need to update db by hubdb one by one (hubdb)
    console.log('updating statistics ... ')
    addRecord(runStatistics(last_builds_failed, number_of_repo))
  })
