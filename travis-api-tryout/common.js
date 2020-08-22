

function travisRepoNameToLink(repo_name){
  try {
    return repo_name.replace('/','%2F')

  } catch (error) {
    console.log(repo_name)
    throw error
  }
}

function sayHelloworld(){
  console.log(`helloworld ${__filename}`)
}

module.exports={
  travisRepoNameToLink
}