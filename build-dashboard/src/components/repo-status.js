import React from 'react'

import './repo-status.css'

class RepoStatus extends React.Component{
  render(){
    let full_name = this.props.full_name

    return(
      <div className="repo-status">
        <div className="repo-status-content">
          <div style={{overflow: "hidden"}}>
            <div className="branch-badge-name-plate">
              {full_name.split('/')[1]}
            </div>

            <div>
              <a href={`https://www.github.com/${full_name}`} target="_blank">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>

          <div className="branch-badge-container">
            <div className="branch-badge">
              <a href={`https://travis-ci.com/${full_name}`} target="_blank">
                <img src={`https://travis-ci.com/${full_name}.svg?branch=master`}/>
              </a>
            </div>
            <div className="branch-badge">
              <a href={`https://travis-ci.com/${full_name}`} target="_blank">
                <img src={`https://travis-ci.com/${full_name}.svg?branch=develop`}/>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RepoStatus