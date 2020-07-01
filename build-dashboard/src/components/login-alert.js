import React from 'react'

class LoginAlert extends React.Component{
  helloButton = (e) => {
    e.preventDefault()
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }

  helloSwalReactContent = (e) => {
    e.preventDefault()

    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: <p>Hello World</p>,
      footer: 'Copyright 2018',
      onOpen: () => {
        // MySwal.clickConfirm()
      }
    }).then(() => {
      return MySwal.fire(<p>Shorthand works too</p>)
    })
  }

  render(){
    return (
      <div className="App">
        swal tryout
        <button onClick={(e) => this.helloButton(e)}>try me</button>

        swal-react-content tryout
        <button onClick={(e) => this.helloSwalReactContent(e)}>try me</button>
      </div>
    );
  }
}


export default LoginAlert