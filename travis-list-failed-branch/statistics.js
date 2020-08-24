const fs = require( 'fs' )
const process = require( 'process' )

const fetch = require( 'node-fetch' )

const STATISTICS_FILE='./branch_fail_statistics.json'

function countSubTotal(json_in){
  let all_branches = Object.values(json_in)
  let flatten_all_branches = []

  all_branches.forEach(x => {
    flatten_all_branches=[...flatten_all_branches, ...x]
  })


  let record_time = new Date().toISOString()

  return {
    'time': record_time,
    'number_of_branches': all_branches.length,
    'number_of_failed_build': flatten_all_branches.length
  }
}

function appendToMasterRecord(result){
  loadJSONFile((file_content) => {
    let current_content = JSON.parse(file_content)
    let appended_content=[...current_content, ...[result]]

    fs.writeFile(STATISTICS_FILE, JSON.stringify(appended_content), () => {})
  })
}

function loadJSONFile(cb){
  return fs.readFile(STATISTICS_FILE, (err, data) => {
    if (err) throw err
    cb(data)
  })
}

function readTestFile(){
  return fs.readFileSync('./answer.json',{encoding: 'utf-8'})
}

function runStatistics(json_in){
  return countSubTotal(json_in)
}

function test(){
  appendToMasterRecord(countSubTotal(JSON.parse(readTestFile())))
}

// test()

module.exports={
  runStatistics
}