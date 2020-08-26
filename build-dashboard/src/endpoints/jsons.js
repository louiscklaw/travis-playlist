
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

function getRepoNameFromBuildsLink(builds_link){
  try {
    var splitted = builds_link.split('/')

  } catch (error) {
    console.error('findme',builds_link)
    throw error
  }
  return splitted[4]+'/'+splitted[5]
}


function getLiveFailedBuildJson(travis_token_in){
  return fetchWithToken('123', travis_token_in)
}

function getUserRepoWithToken(travis_token_in){
  return fetchWithToken(TRAVIS_USER_REPO, travis_token_in)
}

function fetchWithTokenReturnJson(url, travis_token_in){
  return fetchWithToken(url, travis_token_in)
            .then(r => r.json())
}

async function getUserAllRepoWithToken(travis_token_in, fetch_one_page_only){
  let all_repos = []

  // let fetch_result = await fetchWithToken(TRAVIS_USER_REPO, travis_token_in)

  var keep_going = true
  var countdown = 100
  // console.log('fetch_one_page_only',fetch_one_page_only)

  let fetch_url = TRAVIS_USER_REPO

  while ( keep_going ) {
    // console.log(`fetching ${fetch_url}`)
    var fetch_result = await fetchWithTokenReturnJson(fetch_url,travis_token_in)
    var pagination = fetch_result[ '@pagination' ]

    if ( typeof fetch_result['@type'] != 'undefined'){
      if (fetch_result['@type'] == 'error'){
        alert('error found on fetching result')
        alert(travis_token_in)
        keep_going=false
      }
    }

    if (typeof pagination == 'undefined'){
      keep_going = false
    }else{
      keep_going = pagination.next
      let next_href = pagination.next ? pagination.next[ '@href' ] : null
      // console.log(next_href)
      fetch_url = `https://api.travis-ci.com${next_href}`

      all_repos = [
        ...all_repos,
        ...fetch_result.repositories
      ]
    }

    if (fetch_one_page_only == true) {
      console.log('fetch_one_page_only is on')
      break
    }
  }



  return all_repos
}

function travisRepoNameToLink( repo_name ) {
  try {
    return repo_name.replace( '/', '%2F' )

  } catch ( error ) {
    console.log( repo_name )
    throw error
  }
}

function filterLogic(json_in){
  var json_result = json_in
  var branches  = json_result.branches
  var last_builds = branches.map(branch => branch.last_build)

  var last_builds_with_fail = last_builds.filter( last_build => last_build.state =='failed')
  var last_builds_with_cancelled = last_builds.filter( last_build => last_build.state !='passed')

  console.log('findme last_build',last_builds)

  return last_builds_with_fail
}

function translateToBuildsLink(repo_path,build_id){
  // TODO: handle the '/' to put it inside return

  var builds_id = build_id.replace('build','builds')
  return `https://travis-ci.com/github/${repo_path}${builds_id}`
}

function getTravisApiEndpointBranches(repo_in){
  return `https://api.travis-ci.com/repo/github/${travisRepoNameToLink(repo_in)}/branches`
}

function getFailedBranchByRepo(repo_in, travis_token_in){
  let url = getTravisApiEndpointBranches(repo_in)

  return fetchWithTokenReturnJson(url, travis_token_in)
    .then(r_json => {
      return filterLogic(r_json)
    })
    .then( filtered_branches => filtered_branches.map(x => translateToBuildsLink(repo_in,x['@href'])))
}


export {
  getFailedBuildJson,
  getBranchFailStatistics,

  getLiveFailedBuildJson,
  getUserRepoWithToken,
  getUserAllRepoWithToken,
  getFailedBranchByRepo,
  getRepoNameFromBuildsLink
}