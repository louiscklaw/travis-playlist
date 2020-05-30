import React from 'react'

import './repo-status.css'

class RepoStatus extends React.Component{
  render(){
    let full_name = this.props.full_name

    return(
      <div className="repo-status">
        <div className="repo-status-content">
          <div className="branch-badge-name-plate">{full_name.split('/')[1]}</div>
          <div className="branch-badge-container">
            <div className="branch-badge">
              <img src={`https://travis-ci.com/${full_name}.svg?branch=master`}/>
            </div>
            <div className="branch-badge">
              <img src={`https://travis-ci.com/${full_name}.svg?branch=develop`}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RepoStatus