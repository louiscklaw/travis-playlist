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
    { branch_name: 'develop', repo_name: 'travis-playlist' },
    { branch_name: 'master', repo_name: 'react-playlist' },
    { branch_name: 'develop', repo_name: 'react-playlist' },
    { branch_name: 'master', repo_name: 'python-playlist' },
    { branch_name: 'develop', repo_name: 'python-playlist' }
  ]

  var list_to_process = LOCAL_TEST ? test_list : flattenRepoList(branch_names_repo_names)
  var filtered_list = list_to_process.filter(x => repo_skip_list.indexOf(x) == -1)

  return filtered_list

})
.then(filtered_list => {
  console.log(filtered_list)
  const list_without_travis = filtered_list.filter( x => x.search('travis') == -1)
  const num_build_to_test = 30
  const filtered_list_length = list_without_travis.length
  const random_int_max = filtered_list_length-num_build_to_test

  const random_build_start = Math.floor( Math.random() * random_int_max )
  const random_build_end = random_build_start+num_build_to_test

  const failed_build_to_retry = list_without_travis.slice( random_build_start, random_build_end )
  // console.log(filtered_list_length)
  // console.log(random_build_start)
  // console.log(num_build_to_test)
  // console.log('failed_build_to_retry', failed_build_to_retry)

  Promise.all( [
    failed_build_to_retry.map( x => {
        triggerBuildOnTravis( `louiscklaw/${x.repo_name}`, x.branch_name )
      } )
    ] )
    .then( values => {
      return values[ 0 ]
    } )

})



// console.log('hellworld')