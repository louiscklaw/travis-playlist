#!/usr/bin/env node
// https://developer.travis-ci.com/

// curl \
//   -H "Travis-API-Version: 3" \
//   -H "User-Agent: API Explorer" \
//   -H "Authorization: token ${TRAVIS_AUTH_TOKEN}" \
//   https://api.travis-ci.com/repo/github/louiscklaw%2Fportfolio-gatsby/builds

const fs = require('fs')
const process = require('process')

const fetch = require('node-fetch')

function travisRepoNameToLink(repo_name){
  try {
    return repo_name.replace('/','%2F')

  } catch (error) {
    console.log(repo_name)
    throw error
  }
}

function travisRepoNameFromLink(repo_name_in_link){
  return repo_name_in_link.replace('%2F','/')
}

function getTravisLink(repo, build_id){
  return `https://travis-ci.com/github/${repo}/builds/${build_id}`
}

function filterLogic(json_in){

  var result_builds = json_in.builds

  let failed_builds = result_builds.filter( x => x.state != 'passed')
  // let filtered_builds = failed_builds.filter( x => x.previous_state == 'passed')

  let filtered_builds = failed_builds

  // console.log(filtered_builds)
  let output = filtered_builds.map(x => {
    let repo_name = x.repository.slug
    let build_id = x.id

    return getTravisLink(repo_name, build_id)
  })

  return output

}

function getTravisApiEndpointBuilds(repo_in){
  return `https://api.travis-ci.com/repo/github/${travisRepoNameToLink(repo_in)}/builds`
}

function getFailedBuildByRepo(repo_in){
  return fetch(getTravisApiEndpointBuilds(repo_in),{
    headers:{
      'Travis-API-Version': 3,
      'Authorization': `token ${process.env.TRAVIS_AUTH_TOKEN}`,
      "User-Agent": "API Explorer"
    }
  })
    .then(r => r.json())
    .then(r_json => filterLogic(r_json))

}

// getFailedBuildByRepo('louiscklaw/portfolio-gatsby')


// fs.readFile('./sample_result.json',{encoding:'utf-8'}, (err, data) => {
//   filterLogic(JSON.parse(data))
// })

function sayHelloworld(){
  console.log('helloworld')
}

module.exports ={
  getFailedBuildByRepo,
  sayHelloworld
}