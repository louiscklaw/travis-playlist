import React from 'react'

import RepoStatus from './repo-status'
import TestRepoStatus from './test-repo-status'

import './repo-status-container.css'

class RepoStatusContainer extends React.Component{
  render(){
    return(
      <div style={{margin: 'auto'}}>
        <div className="repo-status-container">
          <TestRepoStatus />
          <TestRepoStatus />
          <TestRepoStatus />
          <TestRepoStatus />
          <TestRepoStatus />
          <TestRepoStatus />
          <TestRepoStatus />
          <TestRepoStatus />
          <TestRepoStatus />
          <TestRepoStatus />
          <TestRepoStatus />
          <TestRepoStatus />
          <TestRepoStatus />
          <TestRepoStatus />
        </div>
      </div>

    )
  }
}

export default RepoStatusContainer