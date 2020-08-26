import React from 'react'

import TravisTokenForm from './TravisTokenForm'
// import ModalContext from '../contexts/modal'
import GlobalContext from '../contexts/modal'

function SettingModal(props){
  let {setting_modal_ref}=props
  let [travis_token, setTravisToken] = React.useState()

  const closeSettingModal = ()=>{
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

  React.useEffect(()=>{
    setTravisToken(localStorage.getItem('current_travis_token'))
  },[])

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