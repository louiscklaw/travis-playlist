import React from 'react'

function ListOfFailedBranchHeading(props){
  let {num_fails, num_repos}= props
  return(
    <>
      <h1 className="title is-3">
        list of failed branches
      </h1>
      <h2 className="subtitle is-6">
        (number of repos: {num_repos}, number of fails {num_fails})
      </h2>
    </>
  )
}

export default ListOfFailedBranchHeading