import React from 'react'

function ListOfFailedBranchLiveHeading(props){
  let {num_fails, num_repos}= props
  return(
    <>
      <h1 className="title is-3">
        list of failed branches(live)
      </h1>
      <h2 className="subtitle is-6">
        (number of repos: {num_repos}, number of fails {num_fails})
      </h2>
    </>
  )
}

export default ListOfFailedBranchLiveHeading