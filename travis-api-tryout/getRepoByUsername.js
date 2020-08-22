#!/usr/bin/env node

// curl \
  // -H "Travis-API-Version: 3" \
  // -H "User-Agent: API Explorer" \
  // -H "Authorization: token ${TRAVIS_AUTH_TOKEN}" \
  // https://api.travis-ci.com/builds

const fs = require('fs')
const process = require('process')

const fetch = require('node-fetch')

const {getFailedBuildByRepo} = require('./getFailedBuildByRepo')
const {getFailedBranchByRepo, sayHelloworld} = require('./getFailedBranchByRepo')


function filterLogic(json_in){
  let repos = json_in.repositories
  let repos_slug = repos.map(x => x.slug)
  // let repos_slug = ['louiscklaw/portfolio-gatsby']

  Promise.all(
    repos_slug.map(x => getFailedBranchByRepo(x))
  )
  .then((values)=>{
    console.log(values.filter(x => x.length > 0))
  })

}

fs.readFile('./sample_repos_result.json',{encoding:'utf-8'}, (err, data) => {
  filterLogic(JSON.parse(data))
})


// function getRepoNamesFromUser(username_in){
//   fetch(`https://api.travis-ci.com/owner/${username_in}/repos?limit=999`,{
//     headers:{
//       'Travis-API-Version': 3,
//       'Authorization': `token ${process.env.TRAVIS_AUTH_TOKEN}`,
//       "User-Agent": "API Explorer"
//     }
//   })
//     .then(r => r.json())
//     .then(r_json => {
//       // fs.writeFileSync('./sample_repos_result.json',JSON.stringify(r_json),{encoding:'utf-8'})

//       filterLogic(r_json)

//     })
// }

// getRepoNamesFromUser('louiscklaw')
