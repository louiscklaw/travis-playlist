import React from 'react'

class Navbar extends React.Component{
  render(){
    return(
      <>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="https://bulma.io">
              <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
            </a>

            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item">
                Overview
              </a>

              <a className="navbar-item">
                Build pipe (not implemented)
              </a>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">

              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input className="input" type="text" placeholder="search" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-search"></i>
                  </span>
                </p>
              </div>


              </div>
              <div className="navbar-item">
                <div className="buttons">
                  <a className="button is-primary">
                    <strong>Sign up</strong>
                  </a>
                  <a className="button is-light">
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </>
    )
  }
}

export default Navbar