import React from 'react'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

var PORTFOLIO_PAGE='https://louiscklaw.github.io/'

class Navbar extends React.Component{

  helloSwalReactContent = (e) => {
    e.preventDefault()

    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: <p>Thanks for interest </p>,
      text: 'but sorry the function may not available at the moment.',
      footer: <a href={PORTFOLIO_PAGE}>{PORTFOLIO_PAGE}</a>,
      onOpen: () => {
        // MySwal.clickConfirm()
      }
    }).then(() => {
      return MySwal.fire(<p>sorry again</p>)
    })
  }


  render(){
    return(
      <>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="//louiscklaw.github.io/">
              <div style={{
                fontFamily: 'Noto Sans TC, sans-serif',
                fontSize: 'x-large'
                }}>
                Travis dashboard
              </div>
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
                Build pipe
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
                  <a className="button is-primary" onClick={(e)=>{this.helloSwalReactContent(e)}}>
                    <i className="fas fa-user-plus"></i>
                    <strong>Sign up</strong>
                  </a>
                  <a className="button is-light" onClick={(e)=>{this.helloSwalReactContent(e)}}>
                    <i className="fas fa-sign-in-alt"></i>
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