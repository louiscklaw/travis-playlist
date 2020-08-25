
const FAILED_JSON_URL='/json/build_failed_list.json'

const BUILD_FAILED_LIST_JSON_URL='https://raw.githubusercontent.com/louiscklaw/travis-playlist/db/build_failed_list.json'
const BRANCH_FAIL_STATISTICS_URL='https://raw.githubusercontent.com/louiscklaw/travis-playlist/db/branch_fail_statistics.json'

const TRAVIS_USER_REPO =`https://api.travis-ci.com/owner/louiscklaw/repos`


function getBranchFailStatistics(){
  return fetch(BRANCH_FAIL_STATISTICS_URL)
}

function getFailedBuildJson(){
  return fetch(BUILD_FAILED_LIST_JSON_URL)
}

function fetchWithToken(url_in, travis_token){
  return fetch( url_in, {
    headers: {
      'Travis-API-Version': 3,
      'Authorization': travis_token,
      'Content-Type': 'application/xml'
    }
  } )
}



function getLiveFailedBuildJson(travis_token_in){
  return fetchWithToken('123', travis_token_in)
}

function getUserRepoWithToken(travis_token_in){
  return fetchWithToken(TRAVIS_USER_REPO, travis_token_in)
}

export {
  getFailedBuildJson,
  getBranchFailStatistics,

  getLiveFailedBuildJson,
  getUserRepoWithToken
}