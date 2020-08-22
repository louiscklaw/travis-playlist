#!/usr/bin/env node

// curl \
// -H "Travis-API-Version: 3" \
// -H "User-Agent: API Explorer" \
// -H "Authorization: token ${TRAVIS_AUTH_TOKEN}" \
// https://api.travis-ci.com/builds

const fs = require( 'fs' )
const process = require( 'process' )

const fetch = require( 'node-fetch' )
const {
  isNull
} = require( 'util' )

function fetchRepos( url_in ) {
  console.log(`fetching "${url_in}"`)
  return fetch( url_in, {
      headers: {
        'Travis-API-Version': 3,
        'Authorization': `token ${process.env.TRAVIS_AUTH_TOKEN}`,
        "User-Agent": "API Explorer"
      }
    } )
    .then( r => r.json() )
  // .then( r_json => {
  //   fs.writeFileSync('./sample_repos_result.json',JSON.stringify(r_json),{encoding:'utf-8'})

  // } )
}

async function getRepoNamesFromUser( username_in ) {
  var all_repos = []
  // var test = await fetchRepos( username_in )

  var fetch_url = `https://api.travis-ci.com/owner/louiscklaw/repos`

  var keep_going = true
  while ( keep_going ) {
    var fetch_result = await fetchRepos( fetch_url )
    var pagination = fetch_result['@pagination']
    keep_going = pagination.next
    next_href = pagination.next ? pagination.next['@href'] : null

    // console.log(next_href)
    fetch_url = `https://api.travis-ci.com${next_href}`
    all_repos = [
      ...all_repos,
      ...fetch_result.repositories
    ]
  }
  // Promise.all([
  //   fetchRepos(username_in)
  // ])
  //   .then(values => {
  //     console.log(values)
  //   })
  // fs.writeFileSync( './all_repos.json', JSON.stringify(all_repos), {
  //   encoding: 'utf-8'
  // } )
  // console.log( all_repos )

  return all_repos
}

getRepoNamesFromUser( 'louiscklaw' )
