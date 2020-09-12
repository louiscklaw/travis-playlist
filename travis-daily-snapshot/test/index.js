const {TEST_HOME} = require('./common')
const { SRC_LIB } = require( '../src/lib/common' )

const common = require(`${SRC_LIB}/common`)

const test_helloworld = require('./test_helloworld')
const test_fetchTotalRepos = require('./test_fetchTotalRepos')

function test(){
  test_helloworld.test()
  test_fetchTotalRepos.test()
}

test()
