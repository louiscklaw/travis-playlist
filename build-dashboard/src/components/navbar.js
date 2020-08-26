import React from 'react'
import {Link} from 'gatsby'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// import TravisTokenForm from './TravisTokenForm'
import SettingModal from './setting_modal'

import GlobalContext from '../contexts/global'
import ItemlistFailedBranch from './nav/item_list_failed_branch'

var PORTFOLIO_PAGE='https://louiscklaw.github.io/'

function Navbar(props){
  // let {openSettingModal} = React.useContext(ModalContext)

  let setting_modal_ref = React.useRef()
  let [setting_button_class, setSettingButtonClass] = React.useState('button is-primary')

  let {travis_token, setTravisToken} = React.useContext(GlobalContext)

  const checkTravisTokenExist = () => {
    return travis_token != null
  }

  const showTravisTokenStatus = () => {
    // change button color by token is saved into client local storage or not
    if ( typeof travis_token != 'undefined' ){
      setSettingButtonClass('button is-primary')
    }else{
      setSettingButtonClass('button is-warning')
    }
  }

  React.useEffect(()=>{
    showTravisTokenStatus()
  },[travis_token])

  const openModal = () => {
    setting_modal_ref.current.classList.add('is-active')
  }

  const helloSwalReactContent = (e) => {
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

  React.useEffect(()=>{
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
  })

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
              list failed branches
            </Link>

            <Link to="/branch_fail_statistics" className="navbar-item">
              branch fail statistics
            </Link>

            <ItemlistFailedBranch />

            <Link to="/documentation" className="navbar-item">
              documentation
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

                <a className={setting_button_class} onClick={(e)=>{openModal(e)}}>
                  <i class="fas fa-cogs"></i>
                </a>


                <a className={"button is-primary"} onClick={(e)=>{helloSwalReactContent(e)}}>
                  <i className="fas fa-user-plus"></i>
                  <strong>Sign up</strong>
                </a>
                <a className="button is-light" onClick={(e)=>{helloSwalReactContent(e)}}>
                  <i className="fas fa-sign-in-alt"></i>
                    Log in
                </a>
                {/* <ThemeToggle /> */}
              </div>
            </div>
          </div>


        </div>
      </nav>

      <SettingModal setting_modal_ref={setting_modal_ref} />

    </>
  )
}

export default Navbar
