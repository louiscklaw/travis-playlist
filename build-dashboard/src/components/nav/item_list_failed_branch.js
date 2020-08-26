import React from 'react'
import {Link} from 'gatsby'

import GlobalContext from '../contexts/global'

function ItemlistFailedBranch(props){
  let {travis_token, setTravisToken} = React.useContext(GlobalContext)

  function ListFailedBranch(props){
    return(
      <Link to="/list_failed_branch_live" className="navbar-item">
        list failed branch (Live)
      </Link>
    )
  }

  const showButton = () => {
    return typeof travis_token != 'undefined'
  }

  return(
    <>
      {showButton() ? <ListFailedBranch /> : <></>}
    </>
  )
}

export default ItemlistFailedBranch