import React from 'react'

class RepoListLoading extends React.Component{
  render(){
    return(
      <>
        <div style={{width: '100%'}}>

            <div className="repo-list-is-loading" style={{
              margin: 'auto',
              position: 'relative',
              top: '50vh',
              transofmr: 'translateY(-50%)'
              }}>

              <div style={{width:'25%', margin:'auto', textAlign:'center'}}>
                <div style={{paddingBottom: '100px'}}>
                  repo list is loading... {this.props.repos_loaded} loaded
                </div>
                <progress className="progress is-medium" max="100">45%</progress>
              </div>

            </div>
        </div>

      </>
    )
  }
}

export default RepoListLoading