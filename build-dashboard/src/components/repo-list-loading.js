import React from 'react'
import Footer from './footer'
import './repo-list-loading.css'

class RepoListLoading extends React.Component{
  render(){
    return(
      <div className="loading-body">
        <div className="test">
          <div>
            repo list is loading... {this.props.repos_loaded} loaded
          </div>
          <progress className="progress is-medium" max="100">45%</progress>
        </div>
        <Footer />
      </div>
    )
  }
}

export default RepoListLoading