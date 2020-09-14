const {convRepoNameToSlug} = require('../src/lib/convRepoNameToSlug')

function test_convRepoNameToSlug(){
  console.assert(convRepoNameToSlug('user/reponame') == 'user%2Freponame','convRepoNameToSlug failed')
}

function helloworld(){
  console.log(`helloworld from ${__filename}`)
}

function test(){
  helloworld()
  test_convRepoNameToSlug()
}

module.exports={
  test
}
