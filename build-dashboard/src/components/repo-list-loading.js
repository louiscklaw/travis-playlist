import React from 'react'
import Footer from './footer'
import './repo-list-loading.css'

function RepoListLoading(props){
  return(
    <div>
      <div className="loading-progress-background">
        <div className="loading-progress">
          <div className="loading-progress-text-status">
            repo list is loading... {props.repos_loaded} loaded
          </div>
          <div className="loading-progress-bar">
            <progress className="progress is-medium" max="100">45%</progress>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default RepoListLoading