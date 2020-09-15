const fs = require( 'fs' )
const process = require( 'process' )

const fetch = require( 'node-fetch' )

const {getFailedBranchByRepo} = require('./getFailedBranchByRepo')
const { getFailedSlugByRepo } = require('./getFailedSlugByRepo')
const {getRepoNameFromBuildsLink}= require('./common')
const { getRepoNamesFromUser } = require( './getRepoByUsername' )
const { triggerBuildOnTravis} = require('./src/lib/triggerBuildOnTravis')
const { triggerBuildRequests } = require('./src/lib/triggerBuildRequests')
const {flattenRepoList} = require('./src/lib/flattenRepoList')

const LOCAL_TEST = process.env['CI'] ? false : true

// if local_test fetch first page only, fetch all on formal ci build (e.g. build on travis)
const FETCH_FIRST_PAGE_ONLY = LOCAL_TEST

const repo_skip_list = [
  'traefik-tryout',
  'hkstock-digest',
  'airvantage-api-nodejs'
]



function getFailedBuild(repo_list){
  // console.log(repo_list)
  return Promise.all(
    repo_list.map(repo => getFailedSlugByRepo(repo))
  )
}


Promise.all( [
  getRepoNamesFromUser( 'louiscklaw', LOCAL_TEST )
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
    { branch_name: 'master', repo_name: 'travis-playlist' },
    { branch_name: 'develop', repo_name: 'travis-playlist' }
  ]

  var list_to_process = LOCAL_TEST ? test_list : flattenRepoList(branch_names_repo_names)
  var filtered_list = list_to_process.filter(x => repo_skip_list.indexOf(x) == -1)

  return filtered_list

})
.then(filtered_list => {
  console.log(filtered_list)
  // Promise.all([
  //   filtered_list.map(x => {
  //     triggerBuildOnTravis(`louiscklaw/${x.repo_name}`, x.branch_name)
  //   })
  // ])
  // .then( values => {
  //   return values[0]
  // })
})



// console.log('hellworld')