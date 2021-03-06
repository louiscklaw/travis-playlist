
const {convRepoNameToSlug}= require('./convRepoNameToSlug')
const {travisRequestUrl} = require('./travisRequestUrl')
const {getRequestBody} = require('./getRequestBody')
const {fetchTravisRequestBuild} = require('./fetchTravisRequestBuild')

function triggerBuildOnTravis(repo_name, branch_name){
  const repo_slug = convRepoNameToSlug(repo_name)
  const travis_url = travisRequestUrl(repo_slug)
  const req_body = getRequestBody(branch_name)

  return fetchTravisRequestBuild(travis_url, req_body)
    .then( r => r.json())
    .then( r_json => {
      // console.log(travis_url)
      // console.log(req_body)
      // console.log(r_json)
    })

}

module.exports={
  triggerBuildOnTravis
}
