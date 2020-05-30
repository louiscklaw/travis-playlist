import React from 'react'

import RepoStatus from './repo-status'

class TestRepoStatus extends React.Component{

  render(){
    return(
      <>
        <RepoStatus full_name="travis-lab"/>
      </>
    )
  }
}

export default TestRepoStatus