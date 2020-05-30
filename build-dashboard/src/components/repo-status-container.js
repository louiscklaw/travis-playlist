import React from 'react'
import _ from 'lodash'

import TestRepoStatus from './test-repo-status'
import RepoStatus from './repo-status'

import './repo-status-container.css'

import sample from './sample.json'

class RepoStatusContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      result: null,
      github_json: [],
      github_status: "",
      github_repos: [],
      error: ""
    }
  }

  getGithubRepoJson = (page) => {
    let myRequest = new Request(`https://api.github.com/users/louiscklaw/repos?page=${page}&per_page=99`)
    fetch(myRequest)
    .then(result => {
      this.setState({...this.state, github_status: result.status})
      return result.json()
    })
    .then(json => {
      let repo_list = json.map(x => x.full_name)
      this.setState({...this.state, github_json: [...this.state.github_json, ...json], github_repos: [...this.state.github_repos, ...repo_list]})

    })
    .catch(err => {
      this.setState({...this.state, error: err.message})
    })

  }

  getGithubRepoJsons = () => {
    _.range(1,10+1).map(x => {
      console.log(`findme ${x}`)
      this.getGithubRepoJson(x)
    })
  }

  // temporary skipping to not fire api rate limit error
  componentDidMount = () => {
    this.getGithubRepoJsons()
  }

  componentDidMount1 = () => {
    this.setState({...this.state, github_json: sample, github_repos: sample.map(x => x.full_name)})
  }

  render(){

    return(
      <div style={{margin: 'auto'}}>
        <div className="repo-status-container">
          {
            this.state.github_repos.map(x => {
              return (
                <RepoStatus full_name={x}/>
              )
            })
          }
          {/* <RepoStatus full_name={x}/> */}
        </div>
      </div>

    )
  }
}

export default RepoStatusContainer