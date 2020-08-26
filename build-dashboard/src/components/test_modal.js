import React from 'react'

function TestModal(props){
  let {modal_class}=props
  return(
    <div className={modal_class}>
      hello modal
    </div>

  )
}

export default TestModal