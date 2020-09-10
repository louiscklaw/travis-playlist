
const SRC_LIB=__dirname
const SRC_HOME=__dirname+'/..'
const PROJ_HOME=SRC_HOME+'/..'

function helloworld(){
  console.log('helloworld')
}

module.exports={
  helloworld,
  SRC_LIB,
  SRC_HOME,
  PROJ_HOME
}