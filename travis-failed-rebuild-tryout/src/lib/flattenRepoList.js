
function flattenRepoList(double_layer_array){
  var output =[]
  double_layer_array.map(x => {
    return x.map(xx=> {
      return output.push(xx)
    })
  })
  return output
}

module.exports={
  flattenRepoList
}