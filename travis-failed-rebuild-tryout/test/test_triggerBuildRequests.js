const {triggerBuildRequests} = require('../src/lib/triggerBuildRequests')

function test_triggerBuildRequests(){
  triggerBuildRequests([
    [
      { branch_name: 'master',
      repo_name: 'travis-playlist' }
    ],
    [
      { branch_name: 'develop',
      repo_name: 'travis-playlist' }
    ]
  ])
}

function helloworld(){
  console.log(`helloworld from ${__filename}`)
}

function test(){
  helloworld()
  test_triggerBuildRequests()
}

module.exports={
  test
}
