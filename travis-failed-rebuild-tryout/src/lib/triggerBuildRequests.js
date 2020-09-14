const {triggerBuildOnTravis} = require('./triggerBuildOnTravis')

function triggerBuildRequests(repos_and_branches){
  return Promise.all(
    repos_and_branches.map( (x) => {
      x.map(xx => {
        var test = triggerBuildOnTravis(`louiscklaw/${xx.repo_name}`, xx.branch_name)
        return test
      })
    })
  )
  .then( responses_of_all_requests => {
    return responses_of_all_requests
  })
}


function helloworld(){
  console.log('helloworld')
}

module.exports={
  helloworld,
  triggerBuildRequests
}