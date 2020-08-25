import React , { createContext } from 'react'

// import NameFrom from '../components/NameForm'
import GlobalContext from '../contexts/global'

import TravisTokenForm from '../components/TravisTokenForm'

const ModalContext = createContext();


function ModalContextProvider(props){
  // const [cookies, setCookie] = useCookies(['travis_token']);
  let {saveTravisToken} = React.useContext(GlobalContext)


  let [hello, setHello] = React.useState('world')
  let [setting_modal_class, setSettingModalClass] = React.useState('modal')

  const sayHello = () => {
    console.log('say hello')
  }

  const openSettingModal = () =>{
    setSettingModalClass('modal is-active')
  }

  const closeSettingModal = () => {
    setSettingModalClass('modal')
  }

  function handleOnSubmit(e){
    e.preventDefault()
    saveTravisToken()

    closeSettingModal()
  }

  return(
    <ModalContext.Provider value={{
      hello, setHello,
      sayHello,
      openSettingModal, closeSettingModal
      }}>
      <div class={setting_modal_class}>
        <div class="modal-background"></div>
        <div class="modal-card">

          <header class="modal-card-head">
            <p class="modal-card-title">Travis dashboard settings</p>
            <button class="delete" aria-label="close" onClick={closeSettingModal}></button>
          </header>

          <form onSubmit={(e)=> handleOnSubmit(e)}>
            <section class="modal-card-body">
              {/* <NameFrom name={cookies.name} onChange={onChange}/> */}
              <TravisTokenForm />
            </section>

            <footer class="modal-card-foot">
              {/* <button class="button" onClick={handleOnSubmit}>save</button> */}
              <input type="submit" value="Close" className="button is-danger" />
            </footer>
          </form>

        </div>

      </div>
      { props.children }
    </ModalContext.Provider>
  )
}

export default ModalContext
export {ModalContextProvider};