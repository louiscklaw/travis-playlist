const fs = require( 'fs' )
const process = require( 'process' )
const child_process = require('child_process')

const fetch = require( 'node-fetch' )

const {getFailedBranchByRepo} = require('./getFailedBranchByRepo')
const { getFailedSlugByRepo } = require('./getFailedSlugByRepo')
const {getRepoNameFromBuildsLink}= require('./common')
const { getRepoNamesFromUser } = require( './getRepoByUsername' )
const { triggerBuildOnTravis} = require('./fetch_helper')

const PROJ_HOME=__dirname+"/.."

const CI=process.env['CI']

const first_100_repo_only = CI? false: true


console.log(first_100_repo_only)

process.exit()

function getFailedBuild(repo_list){
  // console.log(repo_list)
  return Promise.all(
    repo_list.map(repo => getFailedSlugByRepo(repo))
  )
}

function triggerBuildRequest(repo, branch){
  return triggerBuildOnTravis(repo,branch)
}

function mergeFixFromDevelop(repo, branch){
  try {
    console.log(`applying fix on repo: ${repo} branch: ${branch}`)

    const command = `./calling_from_travis-failed-rebuild-tryout.sh ${repo} ${branch}`

    const result = child_process.execSync(command,{encoding:'utf-8',cwd:`${PROJ_HOME}/travis-merge-fix-tryout`})
    console.log(result)

    return result
  } catch (error) {
    console.log('probably it is a private branch, skipping')
  }

}

function triggerBuildRequests(repos_and_branches){
  console.log(repos_and_branches)
  return Promise.all(
    repos_and_branches.map( (xx) => {

      // console.log(xx.repo_name)
      // console.log(xx.branch_anme)
      var test = triggerBuildRequest(`louiscklaw/${xx.repo_name}`, xx.branch_name)
      return test

    })
  )
  .then( responses_of_all_requests => {
    return responses_of_all_requests
  })
}

// mergeFixFromDevelop('louiscklaw/traefik-tryout', `feature/enable-redirect-https`)

Promise.all( [
  getRepoNamesFromUser( 'louiscklaw', first_100_repo_only)
] )
.then( values => {
  var repo_list = values[0].map(x => x.slug)

  return getFailedBuild( repo_list )
  .then( repos_results => {
    return repos_results.filter(repo_result => repo_result.length > 0)
  } )
} )
.then( branch_names_repo_names => {
  branch_names_repo_names.map(x => {
    x.map(xx => {

      const repo = `louiscklaw/${xx.repo_name}`
      const branch = xx.branch_name
      console.log('repo', repo)
      console.log('branch',branch)

      mergeFixFromDevelop(repo, branch)

    })
  })
  return branch_names_repo_names
})
.then( branch_names_repo_names =>
{
  return triggerBuildRequests([...branch_names_repo_names])

})



// console.log('hellworld')
