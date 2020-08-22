#!/usr/bin/env node

// curl \
// -H "Travis-API-Version: 3" \
// -H "User-Agent: API Explorer" \
// -H "Authorization: token ${TRAVIS_AUTH_TOKEN}" \
// https://api.travis-ci.com/repo/github/louiscklaw%2Fportfolio-gatsby/branches

const fs = require('fs')
const process = require('process')

const fetch = require('node-fetch')

const {travisRepoNameToLink} = require('./common')

function filterLogic(json_in){
  fs.writeFileSync('./branches.json',JSON.stringify(json_in),{encoding: 'utf-8'})

  var json_result = json_in
  var branches  = json_result.branches
  var last_builds = branches.map(branch => branch.last_build)
  var last_builds_with_fail = last_builds.filter( last_build => last_build.state !='passed')

  return last_builds_with_fail
}

function getTravisApiEndpointBranches(repo_in){
  return `https://api.travis-ci.com/repo/github/${travisRepoNameToLink(repo_in)}/branches`
}

function translateToBuildsLink(repo_path,build_id){
  // TODO: handle the '/' to put it inside return

  var builds_id = build_id.replace('build','builds')
  return `https://travis-ci.com/github/${repo_path}${builds_id}`
}

function getFailedBranchByRepo(repo_in){
  return fetch(getTravisApiEndpointBranches(repo_in),{
    headers:{
      'Travis-API-Version': 3,
      'Authorization': `token ${process.env.TRAVIS_AUTH_TOKEN}`,
      "User-Agent": "API Explorer"
    }
  })
    .then(r => r.json())
    .then(r_json => {return filterLogic(r_json)})
    .then( filtered_branches => filtered_branches.map(x => translateToBuildsLink(repo_in,x['@href'])))
}

function sayHelloworld(){
  console.log(`helloworld ${__filename}`)
}

module.exports ={
  getFailedBranchByRepo,
  sayHelloworld
}
