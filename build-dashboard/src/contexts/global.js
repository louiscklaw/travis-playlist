import React , { createContext } from 'react'

const default_value ={
  saveTravisToken:() => {},
  setTravisToken:()=>{}
}

const GlobalContext = createContext(default_value);

function GlobalContextProvider(props){

  let [hello, setHello] = React.useState('world')
  let [travis_token, setTravisToken] = React.useState()
  let [stored_travis_token, setStoredTravisToken] = React.useState()

  const sayHello = () => {
    console.log('say hello')
  }

  const setLocalStorage = (name, value) => localStorage.setItem(name, value)

  const getLocalStorage = (name) => {
    return localStorage.getItem(name)
  }

  const saveTravisToken = () => {
    setLocalStorage('current_travis_token', travis_token)
  }

  const checkLocalStorage = (name) => {
    const test_value = localStorage.getItem(name)

    console.log('test_value', test_value)
    console.log('test_value', typeof(test_value))
    console.log('test_value', typeof(test_value) == 'undefined')

    if (typeof(test_value) == 'undefined'){
      return false
    }else if (test_value == null){
      return false
    }else{
      return true
    }
  }

  React.useEffect(()=>{
    if (checkLocalStorage('current_travis_token')){
      setTravisToken(getLocalStorage('current_travis_token'))
    }
  },[])

  return(
    <GlobalContext.Provider value={{
      hello, setHello,
      sayHello,
      travis_token, setTravisToken,
      saveTravisToken,
      stored_travis_token, setStoredTravisToken
      }}>

      { props.children }
    </GlobalContext.Provider>
  )
}

export default GlobalContext
export {GlobalContextProvider};