import React from 'react'

import './repo-status.css'

class RepoStatus extends React.Component{
  render(){
    return(
      <div className="repo-status">
        <div className="repo-status-content">
          <div>travis-lab</div>
          <div className="branch-badge-container">
            <div className="branch-badge">
              <img src="https://travis-ci.com/louiscklaw/travis-lab.svg?branch=master"/>
            </div>
            <div className="branch-badge">
              <img src="https://travis-ci.com/louiscklaw/travis-lab.svg?branch=master"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RepoStatus