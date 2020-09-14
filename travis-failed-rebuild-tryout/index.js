const fs = require( 'fs' )
const process = require( 'process' )

const fetch = require( 'node-fetch' )

const {getFailedBranchByRepo} = require('./getFailedBranchByRepo')
const { getFailedSlugByRepo } = require('./getFailedSlugByRepo')
const {getRepoNameFromBuildsLink}= require('./common')
const { getRepoNamesFromUser } = require( './getRepoByUsername' )
const { triggerBuildOnTravis} = require('./src/lib/triggerBuildOnTravis')
const { triggerBuildRequests } = require('./src/lib/triggerBuildRequests')

const LOCAL_TEST = process.env['CI'] ? false : true

// if local_test fetch first page only, fetch all on formal ci build (e.g. build on travis)
const FETCH_FIRST_PAGE_ONLY = LOCAL_TEST

function getFailedBuild(repo_list){
  // console.log(repo_list)
  return Promise.all(
    repo_list.map(repo => getFailedSlugByRepo(repo))
  )
}


Promise.all( [
  getRepoNamesFromUser( 'louiscklaw', FETCH_FIRST_PAGE_ONLY )
] )
.then( values => {
  var repo_list = values[0].map(x => x.slug)

  return getFailedBuild( repo_list )
  .then( repos_results => {
    return repos_results.filter(repo_result => repo_result.length > 0)
  } )
} )
.then( branch_names_repo_names => {
  var test_list=[
    [
      { branch_name: 'master',
      repo_name: 'travis-playlist' }
    ],
    [
      { branch_name: 'develop',
      repo_name: 'travis-playlist' }
    ]
  ]
  var list_to_process = LOCAL_TEST ? test_list : [...branch_names_repo_names]

  return list_to_process.map(x => {
    return x.map( xx => {
      return triggerBuildOnTravis(xx.repo_name, xx.branch_name)
    })
  })

})



// console.log('hellworld')