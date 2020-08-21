#!/usr/bin/env node

const fetch = require('node-fetch');
const process = require('process')

const fs = require('fs')

function getTravisLink(repo, build_id){
  return `https://travis-ci.com/github/${repo}/builds/${build_id}`
}

function filterLogic(json_in){

  var result_builds = json_in.builds

  let failed_builds = result_builds.filter( x => x.state != 'passed')
  let previous_passed_builds = failed_builds.filter( x => x.previous_state == 'passed')


  console.log(previous_passed_builds.map(x => {
    let repo_name = x.repository.slug
    let build_id = x.id

    return getTravisLink(repo_name, build_id)
  }))

  return "done"
}


fetch('https://api.travis-ci.com/repo/github/louiscklaw%2Fportfolio-gatsby/builds',{
  headers:{
    'Travis-API-Version': 3,
    'Authorization': `token ${process.env.TRAVIS_AUTH_TOKEN}`,
    "User-Agent": "API Explorer"
  }
})
  .then(r => r.json())
  .then(r_json => {
    // fs.writeFileSync('./sample_result.json',JSON.stringify(r_json),{encoding:'utf-8'})

    filterLogic(r_json)

  })


// fs.readFile('./sample_result.json',{encoding:'utf-8'}, (err, data) => {
//   filterLogic(JSON.parse(data))
// })
