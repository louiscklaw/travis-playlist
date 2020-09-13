
function fetchWithToken( url_in, travis_token ) {
  return fetch( url_in, {
      headers: {
        'Travis-API-Version': 3,
        'Authorization': travis_token
      }
    } )
}


function helloworld(){
  console.log('helloworld')
}

export {
  helloworld,
  fetchWithToken
}
