import React from 'react';
import GlobalContext from '../contexts/global';

function TravisTokenForm(props){
  let {travis_token, setTravisToken} = React.useContext(GlobalContext)


  const handleTravisTokenChange = (e) => {
    let value = e.target.value
    console.log('value',value)
    setTravisToken(value)
  }

  return(
    <div>
      <h1 className="title is-4">
        paste your travis token below
      </h1>

        <input
          type="text"
          name="travis_token"
          id="travis_token"
          placeholder="Enter travis token"
          // defaultValue={travis_token}
          value={travis_token}
          onChange={(e)=>handleTravisTokenChange(e)}
          size="50"
          />

    </div>
  )
}

export default TravisTokenForm