import React from 'react'

import {getTravisBranchStatus} from '../api/getTravisBranchStatus'
import GlobalContext from '../contexts/global'

import {background_danger, font_color_danger} from './util/branchStatusDanger'
import {background_warning, font_color_warning} from './util/branchStatusWarning'

import './repo-status.css'
import { background_good, font_color_good } from './util/branchStatusGood'

function RepoStatus({full_name}){
  let {travis_token} = React.useContext(GlobalContext)

  // let [master_branch_status, setMasterBranchStatus] = React.useState(null)
  // let [develop_branch_status, setDevelopBranchStatus] = React.useState(null)

  let [branch_status_bg_style, setBranchStatusBgStyle] = React.useState()
  let [branch_status_font_color, setBranchStatusFontColor] = React.useState()


  React.useEffect( () => {
    getTravisBranchStatus( full_name, 'master', travis_token )
      .then( branch_status => {
        if (branch_status != 'passed') {
          setBranchStatusBgStyle(background_danger)
          setBranchStatusFontColor(font_color_danger)
        }else{

          getTravisBranchStatus( full_name, 'develop', travis_token )
          .then( branch_status_develop => {
            if (branch_status_develop != 'passed'){
              setBranchStatusBgStyle(background_warning)
              setBranchStatusFontColor(font_color_warning)
            }else{
              setBranchStatusBgStyle(background_good)
              setBranchStatusFontColor(font_color_good)
            }

          } )

        }
      } )

  }, [] )

  return(
    <div className="repo-status" style={branch_status_bg_style} >
      <div className="repo-status-content has-tooltip-bottom" data-tooltip={full_name}>
        <div style={{overflow: "hidden", textAlign:'center'}}>
          <a className="repo-link-a is-text branch-badge-name-plate is-small" style={branch_status_font_color} >
              {full_name.split('/')[1]}
            </a>
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

export default RepoStatus