
const {SRC_LIB, TEST_HOME, trueIfEqualArray} = require('./common')

const fetchTotalRepos = require(`${SRC_LIB}/fetchTotalRepos`)

function test_sayHelloworld(){
  return fetchTotalRepos.sayHelloworld()
}

function test(){
  test_sayHelloworld()
}

module.exports={
  test
}
