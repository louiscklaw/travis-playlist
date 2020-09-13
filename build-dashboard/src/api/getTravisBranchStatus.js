import {fetchWithToken} from './common'

function getTravisBranchStatus(repo, branch, travis_token){
  let url_repo = repo.replace('/','%2F')

  return fetchWithToken( `https://api.travis-ci.com/repo/github/${url_repo}/branch/${branch}`, travis_token )
    .then(r => r.json())
    .then(r_json => {
      let last_build = r_json && r_json.last_build

      return last_build == null ? false: last_build.state
    })
}

function helloworld(){
  console.log(`helloworld from ${__filename}`)
}

export {
  helloworld,
  getTravisBranchStatus
}