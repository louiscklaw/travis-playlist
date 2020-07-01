import React from 'react'

import './repo-status.css'

class RepoStatus extends React.Component{

  render(){
    let full_name = this.props.full_name

    return(
      <div className="repo-status">
        <div className="repo-status-content has-tooltip-bottom" data-tooltip={full_name}>
          <div style={{overflow: "hidden", textAlign:'center'}}>
            <a className="repo-link-a is-text branch-badge-name-plate is-small" >{full_name.split('/')[1]}</a>
            <div className="repo-icon-list">
              <a href={`https://www.github.com/${full_name}`} target="_blank">
                <i className="fab fa-github"></i>
              </a>
              <a href={`https://www.travis-ci.com/${full_name}`} target="_blank">
                <i className="fas fa-hard-hat"></i>
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