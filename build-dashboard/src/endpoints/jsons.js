
const FAILED_JSON_URL='/json/build_failed_list.json'

function getFailedBuildJson(){
  return fetch(FAILED_JSON_URL)
}

export {
  getFailedBuildJson
}