import React from 'react'
import {Link} from 'gatsby'

function extractBuildNoFromLink(link_in){
  try {
    return link_in.split('/')[7]
  } catch (error) {
    console.log('at build_failed_card.js', link_in)
    throw error
  }
}

function BuildFailedCard(props){
  let {repo_name, content} = props
  return(
    <>
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            <Link to="www.example.com" className="button is-white is-small">
              {repo_name}
            </Link>
          </p>
        </header>
        <div className="card-content">
          <div className="content">
            {
              content.map( link_to_travis => {
                return(
                  <a href={link_to_travis} className="button is-white is-small" target="_blank">
                    {extractBuildNoFromLink(link_to_travis)}
                  </a>
                )
              })
            }
          </div>
        </div>
        <footer className="card-footer">
        </footer>
      </div>
    </>
  )
}

export default BuildFailedCard