
function convRepoNameToSlug(repo_name){
  return repo_name.replace('/','%2F')
}

module.exports={
  convRepoNameToSlug
}