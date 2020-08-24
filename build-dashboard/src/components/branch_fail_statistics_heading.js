import React from 'react'

function BranchFailStatisticsHeading(props){
  let {num_fails, num_repos}= props
  return(
    <>
      <h1 className="title is-3">
        branch fail statistics
      </h1>
      <h2 className="subtitle is-6">

      </h2>
    </>
  )
}

export default BranchFailStatisticsHeading
