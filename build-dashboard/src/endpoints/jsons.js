
const FAILED_JSON_URL='/json/build_failed_list.json'

const BUILD_FAILED_LIST_JSON_URL='https://raw.githubusercontent.com/louiscklaw/travis-playlist/db/build_failed_list.json'
const BRANCH_FAIL_STATISTICS_URL='https://raw.githubusercontent.com/louiscklaw/travis-playlist/db/branch_fail_statistics.json'

function getBranchFailStatistics(){
  return fetch(BRANCH_FAIL_STATISTICS_URL)
}

function getFailedBuildJson(){
  return fetch(BUILD_FAILED_LIST_JSON_URL)
}

export {
  getFailedBuildJson,
  getBranchFailStatistics
}