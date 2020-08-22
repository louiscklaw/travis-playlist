import React from 'react'
import {Link} from 'gatsby'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import ThemeToggle from './theme_toggle'

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

  componentDidMount = () => {
    let el_navbar_burger = document.querySelector('.navbar-burger')
    let el_html = document.querySelector('html')

    el_navbar_burger.addEventListener('click',(e) => {

      if (el_navbar_burger.classList.contains("is-active")){
        document.querySelector(`.navbar-burger`).classList.remove('is-active')
        document.querySelector(`#navbarContent`).classList.remove('is-active')
      }else{
        document.querySelector(`.navbar-burger`).classList.add('is-active')
        document.querySelector(`#navbarContent`).classList.add('is-active')
      }
    })

    el_html.addEventListener('click', (e) => {

      if (e.target.classList.contains('navbar-burger')){
      }else{
        if ( el_navbar_burger.classList.contains("is-active")){
          document.querySelector(`.navbar-burger`).classList.remove('is-active')
          document.querySelector(`#navbarContent`).classList.remove('is-active')
        }
      }
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

            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarContent">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarContent" className="navbar-menu">
            <div className="navbar-start">
              <Link to="/" className="navbar-item">
                Overview
              </Link>

              <Link to="/list_of_failed_branch" className="navbar-item">
                list of failed branches
              </Link>
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
                  {/* <ThemeToggle /> */}
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