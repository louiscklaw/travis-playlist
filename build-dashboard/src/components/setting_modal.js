import React from 'react'

import TravisTokenForm from './TravisTokenForm'
// import ModalContext from '../contexts/modal'
import GlobalContext from '../contexts/global'

function SettingModal(props){
  let {setting_modal_ref}=props

  let {travis_token, setTravisToken} = React.useContext(GlobalContext)

  let test_global_context = React.useContext(GlobalContext)
  const closeSettingModal = ()=>{
    localStorage.setItem('current_travis_token', travis_token)
    setTravisToken(travis_token)
    setting_modal_ref.current.classList.remove('is-active')
  }

  const handleOnChange = (e) => {
    let value = e.target.value
    setTravisToken(value)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('current_travis_token', travis_token)
    closeSettingModal()
  }

  return(
    <>
      <div className="modal" ref={setting_modal_ref}>
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Travis dashboard settings</p>
            <button class="delete" aria-label="close" onClick={closeSettingModal}></button>
          </header>

          <form onSubmit={(e)=> handleOnSubmit(e)}>
            <section class="modal-card-body">
              {/* <NameFrom name={cookies.name} onChange={onChange}/> */}

              <input
                type="text"
                name="travis_token"
                id="travis_token"
                placeholder="Enter travis token"
                // defaultValue={travis_token}
                value={travis_token}
                onChange={(e)=>handleOnChange(e)}
                size="50"
                />

            </section>

            <footer class="modal-card-foot">
              {/* <button class="button" onClick={handleOnSubmit}>save</button> */}
              <input type="submit" value="Close" className="button is-danger" />
            </footer>
          </form>
        </div>
      </div>
    </>
  )
}

export default SettingModal