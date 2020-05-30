import React from 'react'

import {ThemeContext} from '../contexts/theme'

function ThemeToggle() {
  console.log(ThemeContext)
  let {is_dark,toggleTheme} = React.useContext(ThemeContext)

  return(
    <>
      <a className="button is-white" style={{paddingRight:'0px'}} onClick={(e)=>{toggleTheme(e)}} >
        {is_dark ? <i class="fas fa-sun"></i> : <i class="fas fa-moon"></i>}
      </a>
    </>
  )
}

export default ThemeToggle
