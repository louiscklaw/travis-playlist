import React from 'react'
import _ from 'lodash'

import TestRepoStatus from './test-repo-status'
import RepoStatus from './repo-status'
import RepoListLoading from './repo-list-loading'

import './repo-status-container.css'

import {MAX_GITHUB_PAGE_TO_FETCH} from '../../config'
import sample from './sample.json'

function ReposStatus(props){
  return(
    <div className="repos-status">
      {
        props.repos.sort().map(x => {
          return (
            <RepoStatus key={`repo-status-${x}`} full_name={x}/>
          )
        })
      }
    </div>
  )
}

class RepoStatusContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      result: null,
      github_json: [],
      github_status: "",
      github_repos: [],
      error: "",
      is_loading: true,
      max_github_page_to_fetch: MAX_GITHUB_PAGE_TO_FETCH
    }
  }

  getGithubRepoJson = (page) => {
    let myRequest = new Request(`https://api.github.com/users/louiscklaw/repos?page=${page}&per_page=99`)
    return fetch(myRequest)
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

  getGithubRepoJsons = async (cb) => {
    let max_page = this.state.max_github_page_to_fetch
    for(var i=1; i< max_page+1;i+=1){
      await this.getGithubRepoJson(i)
    }
    return cb()
  }

  loadingComplete = () => {
    console.log("calling loadingComplete")
    this.setState({...this.state, is_loading: false})
  }

  // temporary skipping to not fire api rate limit error
  componentDidMount = () => {
    if (this.state.max_github_page_to_fetch == 0){
      this.setState({...this.state,
        github_json: sample,
        github_repos: sample.map(x => x.full_name),
        is_loading: false
      })
    }else{
      this.getGithubRepoJsons(this.loadingComplete)
    }
  }

  showRepoList = () => {

    if (this.state.is_loading){
      console.log('is_loading true')
      return (<RepoListLoading repos_loaded={this.state.github_repos.length}/>)
    }else{
      console.log('is_loading false')
      console.log(this.state.github_repos)
      return this.state.github_repos.sort().map(x => {
        return (
          <RepoStatus key={`repo-status-${x}`} full_name={x}/>
        )
      })
    }
  }

  render(){
    return(
      <div style={{margin: 'auto'}}>
        <div className="repo-status-container">
          {
            this.state.is_loading ? <RepoListLoading repos_loaded={this.state.github_repos.length}/>: <ReposStatus repos={this.state.github_repos} />
          }
        </div>
      </div>

    )
  }
}

export default RepoStatusContainer