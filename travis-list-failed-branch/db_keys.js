const name_to_key={
  'hello':'h',
  'apple':'a',
  'h':'hh',
  'time':'t',
  'number_of_branches':'n',
  'number_of_failed_build':'f'
}

const key_to_name=reverseNameToKey(name_to_key)

function reverseNameToKey(name_key_in){
  var output={}
  Object.keys(name_key_in).forEach(name => {
    let key = name_key_in[name]
    output[key] = name
  })

  return output
}

function wantedNotFound(dict, key){
  return (Object.keys(dict)).indexOf(key) < 0
}

function wantedKeyNotFound(wanted_key){
  "find the key in name to key pool, for compression, shrink"
  return wantedNotFound(name_to_key, wanted_key)
}

function wantedNameNotFound(wanted_name){
  "find the name in key to name pool, for expansion, bloat"
  return wantedNotFound(key_to_name, wanted_name)
}

function translateToName(key_in){
  "key to name, for expansion, bloat"
  var output = {}
  Object.keys(key_in).forEach( key => {
    if (wantedNameNotFound(key)) throw `wanted key not found, name ${key}`
    output[key_to_name[key]] = key_in[key]
  })
  return output
}

function translateToKey(name_in){
  "name to key, for compression, shrink"

  var output = {}
  Object.keys(name_in).forEach( test_name => {
    if (wantedKeyNotFound(test_name)) throw `wanted key not found, key ${test_name}`
    output[name_to_key[test_name]] = name_in[test_name]
  })
  return output
}

function translateToKeys(array_names_in){
  "name to key, for compression, shrink"
  console.log(array_names_in)
  return array_names_in.map( x => {
    return translateToKey(x)
  })
}

function translateToNames(array_key_in){
  "key to name, for expansion, bloat"
  return array_key_in.map( x => {
    return translateToName(x)
  })
}

module.exports={
  name_to_key,
  key_to_name,
  translateToKey,
  translateToName,
  translateToKeys,
  translateToNames
}