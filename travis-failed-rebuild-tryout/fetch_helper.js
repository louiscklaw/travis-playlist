
const fs = require( 'fs' )
const process = require( 'process' )
const fetch = require( 'node-fetch' )
const ProxyAgent = require('simple-proxy-agent')

function sayHelloworld(){
  console.log(`helloworld from ${__filename}`)
}

function fetchTravisRequestBuildProxied( url_in , req_body ) {

	// const response = await fetch('https://httpbin.org/post', {
	// 	method: 'post',
	// 	body: JSON.stringify(body),
	// 	headers: {'Content-Type': 'application/json'}
	// });
	// const json = await response.json();

  return fetch( url_in, {
    agent: new ProxyAgent( 'http://0.0.0.0:8080', {
        // Options, with all defaults
        tunnel: true, // If true, will tunnel all HTTPS using CONNECT method
        timeout: 5000, // Time in milli-seconds, to maximum wait for proxy connection to establish
      } ),
      headers: {
        'Travis-API-Version': 3,
        'Authorization': `token ${process.env.TRAVIS_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'post',
      body: JSON.stringify( req_body )
    } )
}

const travis_request_url = (repo_slug) =>  `http://api.travis-ci.com/repo/${repo_slug}/requests`

const conv_repo_name_to_slug = (repo_name) => repo_name.replace('/','%2F')

const getRequestBody = (branch_name) => {return {
  request: {
    branch: branch_name,
    messages: "rebuild triggered by travis-failed-rebuild-tryout"
  }
}}

// triggerBuildOnTravis('louiscklaw/dotfiles', 'tests/add-installLigblib2-sh')

module.exports={
  sayHelloworld,
  triggerBuildOnTravis
}