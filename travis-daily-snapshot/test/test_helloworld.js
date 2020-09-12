
const {SRC_LIB, TEST_HOME, trueIfEqualArray} = require('./common')

const helloworld = require(`${SRC_LIB}/helloworld`)

function test_sayHelloworld(){
  return helloworld.sayHelloworld()
}

function test(){
  test_sayHelloworld()
}

module.exports={
  test
}
