const fs = require( 'fs' )
const process = require( 'process' )

const fetch = require( 'node-fetch' )

// console.log(getRepoNameFromBuildsLink('https://travis-ci.com/github/louiscklaw/selenium-playlist/builds/176290771'))
function getRepoNameFromBuildsLink(builds_link){
  var splitted = builds_link.split('/')
  return splitted[4]+'/'+splitted[5]
}


function fetchWithToken( url_in ) {
  return fetch( url_in, {
      headers: {
        'Travis-API-Version': 3,
        'Authorization': `token ${process.env.TRAVIS_AUTH_TOKEN}`,
        "User-Agent": "API Explorer"
      }
    } )
}

function travisRepoNameToLink( repo_name ) {
  try {
    return repo_name.replace( '/', '%2F' )

  } catch ( error ) {
    console.log( repo_name )
    throw error
  }
}

function sayHelloworld() {
  console.log( `helloworld ${__filename}` )
}

module.exports = {
  travisRepoNameToLink,
  fetchWithToken,
  getRepoNameFromBuildsLink
}