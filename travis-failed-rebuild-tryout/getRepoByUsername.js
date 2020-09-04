#!/usr/bin/env node

// curl \
// -H "Travis-API-Version: 3" \
// -H "User-Agent: API Explorer" \
// -H "Authorization: token ${TRAVIS_AUTH_TOKEN}" \
// https://api.travis-ci.com/builds

const fs = require( 'fs' )
const process = require( 'process' )

// const {getFailedBuildByRepo} = require('./getFailedBuildByRepo')
const { getFailedBranchByRepo } = require( './getFailedBranchByRepo' )

const {fetchWithToken} = require('./common')

async function fetchRepos( url ) {
  return fetchWithToken( url )
      .then( r => r.json() )
}

async function getRepoNamesFromUser( username_in, fetch_one_page_only=false ) {
  var all_repos = []

  var fetch_url = `https://api.travis-ci.com/owner/${username_in}/repos`

  var keep_going = true
  while ( keep_going ) {
    console.log(`fetching ${fetch_url}`)
    var fetch_result = await fetchRepos( fetch_url )
    var pagination = fetch_result[ '@pagination' ]
    keep_going = pagination.next
    next_href = pagination.next ? pagination.next[ '@href' ] : null

    // console.log(next_href)
    fetch_url = `https://api.travis-ci.com${next_href}`
    all_repos = [
      ...all_repos,
      ...fetch_result.repositories
    ]
    if (fetch_one_page_only){
      break
    }
  }

  return all_repos

}

function sayHelloworld() {
  console.log( `helloworld ${__filename}` )
}

module.exports = {
  getRepoNamesFromUser,
  sayHelloworld
}