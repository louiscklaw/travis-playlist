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
            <div className="tags">
            {
              content.map( link_to_travis => {
                return(
                  <span class="tag is-danger">
                    <a href={link_to_travis}
                      style={{color: "white", padding: "3px;"}}
                      target="_blank">
                      <i class="fas fa-times"></i>
                      {extractBuildNoFromLink(link_to_travis)}
                    </a>
                  </span>
                )
              })
            }
            </div>
          </div>
        </div>
        <footer className="card-footer">
        </footer>
      </div>
    </>
  )
}

export default BuildFailedCard