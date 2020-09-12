const fs = require( 'fs' )
const process = require( 'process' )

const fetch = require( 'node-fetch' )

const {getFailedBranchByRepo} = require('./getFailedBranchByRepo')
const { getFailedSlugByRepo } = require('./getFailedSlugByRepo')
const {getRepoNameFromBuildsLink}= require('./common')
const { getRepoNamesFromUser } = require( './getRepoByUsername' )
const { triggerBuildOnTravis} = require('./fetch_helper')

function getFailedBuild(repo_list){
  // console.log(repo_list)
  return Promise.all(
    repo_list.map(repo => getFailedSlugByRepo(repo))
  )
}

function triggerBuildRequest(repo, branch){
  console.log('triggerBuildRequest', repo, branch)
  return triggerBuildOnTravis(repo,branch)
}

function triggerBuildRequests(repos_and_branches){
  // console.log(repos_and_branches)
  return Promise.all(
    repos_and_branches.map( (xx) => {

      // console.log(xx.repo_name)
      // console.log(xx.branch_anme)
      var test = triggerBuildRequest(`louiscklaw/${xx.repo_name}`, xx.branch_name)
      return test

    })
  )
  .then( responses_of_all_requests => {

  })
}


Promise.all( [
  getRepoNamesFromUser( 'louiscklaw' )
] )
.then( values => {
  var repo_list = values[0].map(x => x.slug)

  return getFailedBuild( repo_list )
  .then( repos_results => {
    return repos_results.filter(repo_result => repo_result.length > 0)
  } )
} )
.then( branch_names_repo_names => {
  return triggerBuildRequests([...branch_names_repo_names])
})



// console.log('hellworld')