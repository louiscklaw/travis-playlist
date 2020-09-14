
function convRepoNameToSlug(repo_name){
  console.log(repo_name)
  return repo_name.replace('/','%2F')
}

module.exports={
  convRepoNameToSlug
}