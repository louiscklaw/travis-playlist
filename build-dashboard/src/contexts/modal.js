import React , { createContext } from 'react'

// import NameFrom from '../components/NameForm'
import GlobalContext from '../contexts/global'

import TravisTokenForm from '../components/TravisTokenForm'

const default_value = {
  openSettingModal: () => {}
}

const ModalContext = createContext(default_value);


function ModalContextProvider(props){
  let modal_ref = React.useRef()

  // const [cookies, setCookie] = useCookies(['travis_token']);
  let {saveTravisToken} = React.useContext(GlobalContext)


  let [hello, setHello] = React.useState('world')
  let [setting_modal_class, setSettingModalClass] = React.useState('modal')

  const sayHello = () => {
    console.log('say hello')
  }

  const openSettingModal = () =>{
    modal_ref.current.classList.add('is-active')
  }

  const closeSettingModal = () => {
    modal_ref.current.classList.remove('is-active')
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
      { props.children }
    </ModalContext.Provider>
  )
}

export default ModalContext
export {ModalContextProvider};