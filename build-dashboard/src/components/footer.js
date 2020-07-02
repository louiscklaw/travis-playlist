import React from 'react'
import './footer.css'

function Footer(){
  return(
    <footer className="custom-footer">
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  )
}

export default Footer