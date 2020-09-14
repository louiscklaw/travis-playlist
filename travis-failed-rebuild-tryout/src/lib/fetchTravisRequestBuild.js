const fetch = require( 'node-fetch' )

function fetchTravisRequestBuild( url_in , req_body ) {
  console.log(url_in)
  return fetch( url_in, {
      headers: {
        'Travis-API-Version': 3,
        'Authorization': `token ${process.env.TRAVIS_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(req_body)
    } )
}

module.exports={
  fetchTravisRequestBuild
}
