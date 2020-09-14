
const getRequestBody = (branch_name) => {return {
  request: {
    branch: branch_name,
    messages: "rebuild triggered by travis-failed-rebuild-tryout"
  }
}}


module.exports={
  getRequestBody
}